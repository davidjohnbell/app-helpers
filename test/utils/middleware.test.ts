export type NextFunction = () => void
export type Stack<T> = (context: T) => void
export type Use<T> = (middleware: Middleware<T>) => void
export type Middleware<T> = (context: T, next: NextFunction) => any
export function middleware<T>(...middlewares: Array<Middleware<T>>): Stack<T> {
    let stack: Stack<T> = () => { }
    let use: Use<T> = middleware => {
        let _stack = stack
        stack = (context: T) => {
            middleware(context, () => _stack(context))
        }
    }
    for (let i = middlewares.length - 1; i >= 0; i--)
        use(middlewares[i])
    return stack
}
