import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Self} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription|null = null;

  constructor(@Self() private readonly element: ElementRef) { }

  ngOnInit() {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    if (!this.element.nativeElement.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.clicks.next(event);
    }
  }
}
