import { range, combineLatest, interval, fromEvent, of, concat, merge, zip, iif } from 'rxjs';
import {
    map,
    filter,
    tap,
    mapTo,
    debounceTime,
    switchMap,
    withLatestFrom,
    take,
    delay,
    mergeMap
} from 'rxjs/operators';

const print = (x) => console.log(x);
const elem = (id) => document.getElementById(id);

/* streams */
const range$ = range(1, 10);
const range2$ = range(11, 10);
const interval$ = interval(1000);

/* range example */
const rangeExample$ = fromEvent(elem('range'), 'click');
rangeExample$.subscribe(() => range$.subscribe(print));

/* filter example */
const filterExample$ = fromEvent(elem('filter'), 'click');
filterExample$.subscribe(() => range$.pipe(filter((x) => x % 2 === 1)).subscribe(print));

/* tap example */
const tapExample$ = fromEvent(elem('tap'), 'click');
tapExample$.subscribe(() => {
    range$
        .pipe(
            tap((x) => print(`tap for ${x}`)),
            filter((x) => x % 2 === 1)
        )
        .subscribe(print);
});

/* map example */
const mapExample$ = fromEvent(elem('map'), 'click');
mapExample$.subscribe(() => range$.pipe(map((x) => x * 2)).subscribe(print));

/* mapTo example */
const mapToExample$ = fromEvent(elem('mapTo'), 'click');
mapToExample$.subscribe(() => range$.pipe(mapTo('Example')).subscribe(print));

/* interval example */
const intervalExample$ = fromEvent(elem('interval'), 'click');
intervalExample$.subscribe(() => interval$.subscribe(print));

/* combineLast example */
const combineLatestExample$ = fromEvent(elem('combineLatest'), 'click');
combineLatestExample$.subscribe(() => {
    combineLatest([interval$, range$])
        .pipe(map(([, i]) => i))
        .subscribe(print);
});

/* withLatestFrom example */
const withLatestFromExample$ = fromEvent(elem('withLatestFrom'), 'click');
withLatestFromExample$.subscribe(() => {
    interval$
        .pipe(withLatestFrom(range$))
        .pipe(map(([, i]) => i))
        .subscribe(print);
});

/* of example */
const ofExample$ = fromEvent(elem('of'), 'click');
ofExample$.subscribe(() => {
    of('UNO').subscribe(print);
});

/* zip example */
const zipExample$ = fromEvent(elem('zip'), 'click');
zipExample$.subscribe(() => {
    zip(
        of('UNO').pipe(delay(1000)),
        of('DOS').pipe(delay(2000)),
        of('TRES').pipe(delay(3000)),
        of('CUATRO').pipe(delay(4000))
    ).subscribe(print);
});

/* concat example */
const concatExample$ = fromEvent(elem('concat'), 'click');
concatExample$.subscribe(() => {
    concat(range$, range2$).subscribe(print);
});

/* concat example (incomplete scenario) */
const incompleteExample$ = fromEvent(elem('incomplete'), 'click');
incompleteExample$.subscribe(() => {
    concat(interval$, range2$).subscribe(print);
});

/* switchMap example */
const switchMapExample$ = fromEvent(elem('switchMap'), 'click');
switchMapExample$
    .pipe(
        switchMap(() => interval$),
        withLatestFrom(range$),
        map(([, i]) => i)
    )
    .subscribe(print);

/* take example */
const takeExample$ = fromEvent(elem('take'), 'click');
takeExample$.subscribe(() => interval$.pipe(take(5)).subscribe(print));

/* merge example */
const mergeExample$ = fromEvent(elem('merge'), 'click');
mergeExample$.subscribe(() => {
    merge(
        interval$.pipe(mapTo('UNO')),
        interval$.pipe(
            delay(500),
            mapTo('DOS')
        )
    ).subscribe(print);
});

/* iif example */
const iifExample$ = fromEvent(elem('iif'), 'click');
iifExample$.subscribe(() => {
    interval$.pipe(mergeMap((v) => iif(() => v % 2 === 0, of('PAR'), of('IMPAR')))).subscribe(print);
});

/* debounceTime example */
const debounceTimeExample$ = fromEvent(elem('debounceTime'), 'keyup');
debounceTimeExample$.pipe(debounceTime(500)).subscribe(print);
