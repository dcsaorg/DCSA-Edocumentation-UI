import {Directive, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Dropdown} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api/selectitem';

@Directive({
  selector: '[appEnumDropDown]'
})
export class EnumDropdownDirective<E> implements OnInit, OnDestroy, OnChanges {
  private subscription: Subscription | null = null;
  @Input() values$: Observable<SelectItem<E|null>[]> | null = null;

  constructor(
    // Injecting the Dropdown component instance.
    @Self() private readonly primeDropdown: Dropdown,
  ) {}


  ngOnInit() {
    this.primeDropdown.filter = true;
    this.primeDropdown.filterBy = 'label,value';
    this.primeDropdown.optionValue = 'value';
    this.primeDropdown.showClear = !this.primeDropdown.required
    this.computeOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.computeOptions();
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private computeOptions(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
    const values$ = this.values$;
    if (values$) {
      this.subscription = values$.subscribe({
        next: v => {
          if (!this.primeDropdown.required) {
            v.push(this.nullValue());
          }
          this.primeDropdown.options = v;
        }
      })
    }
  }

  private nullValue(): SelectItem<E|null> {
    return {
      label: "[unset]",
      value: null,
    }
  }
}
