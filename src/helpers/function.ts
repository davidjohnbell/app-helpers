type Fn<T> = (...args: any[]) => T
type From<T, U> = (arg: T) => U

export function isFunction(value: unknown): value is Function {
    return value != null && typeof value === 'function'
}

export function compose<T, U>(f: From<T, U>, g: Fn<T>): Fn<U> {
    return (...args: any[]) => f(g(...args))
}

export function pipe<T, U>(t: Fn<T>, u: From<T, U>): Fn<U>
export function pipe<T, U, V>(t: Fn<T>, u: From<T, U>, v: From<U, V>): Fn<V>
export function pipe<T, U, V, W>(t: Fn<T>, u: From<T, U>, v: From<U, V>, w: From<V, W>): Fn<W>
export function pipe(...fns: Fn<any>[]) {
    return fns.reduceRight(compose)
}

export function curry<T>(f: Fn<T>, ...args: any[]): Fn<T> | T {
    const curried =  f.length <= args.length ? f(...args) : (...more: any[]) => curry(f, ...args, ...more) as any
    return curried as Fn<T> | T
}

export function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}