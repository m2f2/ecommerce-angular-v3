import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.scss'
})
export class ObservableComponent implements OnInit, OnDestroy {

  evenNumbers!: Observable<string>;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    const counter = interval(1000);

    this.evenNumbers = counter.pipe(
      filter(num => num % 2 === 0),
      take(10),
      map(num => `Even Number: ${num}`)
    );

    this.subscription = this.evenNumbers.subscribe(
      {
        next: (value) => console.log(value),
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Completed!')
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
