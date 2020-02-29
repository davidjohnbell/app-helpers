export function isObject(value: unknown): value is object {
    return value != null && (typeof value === 'object' || typeof value === 'function') && !Array.isArray(value)
}

export function isNotEmptyObject(value: unknown): boolean {
    return isObject(value) && Object.keys(value).length === 0
}

export function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}