export function throttle(fn: Function, delay: number): Function {
    let lastCall = 0
    return (...args: any[]) => {
        const now = new Date().getTime()
        if(now - lastCall < delay) return
        lastCall = now
        return fn(...args)
    }
}

export function debounce(fn: Function, delay: number): Function {
    let handle: any
    return (...args: any[]) => {
        if(handle) clearTimeout(handle)
        handle = setTimeout(() => {
            fn(...args)
            handle = null
        }, delay)
    }
}