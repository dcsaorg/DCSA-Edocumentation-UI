import {Directive, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Dropdown} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api/selectitem';
import {nullSelectItem} from '../util/object-factory';

@Directive({
  selector: '[appEnumDropDown]'
})
export class EnumDropdownDirective<E> implements OnInit, OnDestroy, OnChanges {
  private subscription: Subscription | null = null;
  @Input() values$: Observable<SelectItem<E|null>[]> | null = null;
  // The auto-static-required only works reliably if required is static. Accordingly,
  // the `static` part in the value.
  @Input() nullable: 'auto-static-required'|boolean = 'auto-static-required';

  constructor(
    // Injecting the Dropdown component instance.
    @Self() private readonly primeDropdown: Dropdown,
  ) {}


  ngOnInit(): void {
    this.primeDropdown.filter = true;
    this.primeDropdown.filterBy = 'label,value';
    this.primeDropdown.optionValue = 'value';
    this.updateHostElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostElement();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private updateHostElement(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
    const values$ = this.values$;
    let nullable: boolean;
    if (this.nullable === 'auto-static-required') {
      nullable = this.primeDropdown.required
    } else {
      nullable = this.nullable;
    }
    this.primeDropdown.showClear = nullable;
    if (values$) {
      this.subscription = values$.subscribe({
        next: v => {
          if (nullable && !v.find(i => i.value === null)) {
            v.push(nullSelectItem());
          }
          this.primeDropdown.options = v;
        }
      })
    }
  }
}
