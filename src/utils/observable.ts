export interface Observer<T> {
    next?: (item: T) => void
    complete?: () => void
    error?: (err: any) => void
}

export type TearDown = () => void
export type Observable<T> = (observer: Observer<T>) => TearDown

export function interval(ms: number): Observable<number> {
    return (observer: Observer<number>) => {
        let iterations = 0
        const intervalId = setInterval(() => {
            try {
                observer.next?.(++iterations)
            }
            catch (e) {
                observer.error?.(e)
            }
        }, ms)
        return () => clearInterval(intervalId)
    }
}

export function stream<T>(arr: Array<T>): Observable<T> {
    return (observer: Observer<T>) => {
        let unsub = false
        try {
            for (let i = 0; i < arr.length && !unsub; i++) {
                observer.next?.(arr[i])
            }
        }
        catch (e) {
            observer.error?.(e)
        }
        finally {
            observer.complete?.()
        }
        return () => {
            unsub = true
        }
    }
}

export function map<T, U>(observable: Observable<T>, project: (item: T) => U): Observable<U> {
    return (observer: Observer<U>) => {
        return observable({
            next: (item: T) => observer.next?.(project(item)),
            complete: observer.complete,
            error: observer.error
        })
    }
}

export function merge<T, U>(observableT: Observable<T>, observableU: Observable<U>): Observable<T | U> {
    return (observer: Observer<T | U>) => {
        const unsubT = observableT({
            next: observer.next,
            complete: observer.complete,
            error: observer.error
        })

        const unsubU = observableU({
            next: observer.next,
            complete: observer.complete,
            error: observer.error
        })

        return () => {
            unsubT()
            unsubU()
        }
    }
}

export function switchMap<T, U>(observableT: Observable<T>, observableU: Observable<U>): Observable <U> {
    return (observer: Observer<U>) => {
        let unsubU: TearDown
        const unsubT = observableT({
            next: () => {
                unsubU = observableU({
                    next: observer.next,
                })
            },
            complete: observer.complete,
            error: observer.error
        })
        return () => {
            unsubT()
            unsubU()
        }
    }
}

export function zip<T, U>(observableT: Observable<T>, observableU: Observable<U>): Observable<[T, U]>
export function zip<T, U, V>(observableT: Observable<T>, observableU: Observable<U>, obervableV: Observable<V>): Observable<[T, U, V]>
export function zip<T, U, V, W>(observableT: Observable<T>, observableU: Observable<U>, obervableV: Observable<V>, obervableW: Observable<W>): Observable<[T, U, V, W]>
export function zip(...observables: Array<Observable<any>>): Observable<Array<any>> {
    return (observer: Observer<Array<any>>) => {
        const results: Array<any> = Array(observables.length)
        const unsubs: Array<TearDown> = Array(observables.length)
        observables.forEach((observable, i) => {
            unsubs[i] = (observable({
                next: (value: any) => {
                    results[i] = value
                    observer.next?.(results.slice())
                },
                complete: observer.complete,
                error: observer.error
            }))
        })
        return () => unsubs.forEach(unsub => unsub())
    }
}

export function multicast<T>(observable: Observable<T>, ...observers: Array<Observer<T>>): Observable<T> {
    return (observer: Observer<T>) => {
        observers.unshift(observer)
        return observable({
            next: (val) => observers.forEach(observer => observer.next?.(val)),
            complete: () => observers.forEach((observer: Observer<T>) => observer.complete?.()),
            error: (err) => observers.forEach((observer: Observer<T>) => observer.error?.(err))
        })
    }
}