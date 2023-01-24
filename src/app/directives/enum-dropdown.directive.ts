import {Directive, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges} from '@angular/core';
import {map, Observable, Subscription} from 'rxjs';
import {Dropdown} from 'primeng/dropdown';

interface DropdownItem<E> {
  label: string;
  value: E;
}

@Directive({
  selector: '[appEnumDropDown]'
})
export class EnumDropdownDirective<E> implements OnInit, OnDestroy, OnChanges {
  private subscription: Subscription | null = null;
  @Input() values$: Observable<E[]> | null = null;

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
      this.subscription = values$.pipe(
        map(v => v.map(this.codeAsLabel))
      ).subscribe({
        next: v => {
          this.primeDropdown.options = v;
        }
      })
    }
  }

  private codeAsLabel(e: E): DropdownItem<E> {
    return {
      label: `${e}`,
      value: e,
    }
  }
}
