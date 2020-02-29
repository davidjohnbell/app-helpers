export function snakeToCamel(str: string): string {
    return str.replace(/([-_][a-z])/g, group => {
        return group.toUpperCase().replace('-', '').replace('_', '')
    })
}

export function camelToSnake(str: string) {
    return str.replace(/[A-Z]/g, letter => {
        return `_${letter.toLowerCase()}`
    })
}

export function generateId(length: number) {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for(let i = 0; i < length; i++ ) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
    }
    return result
}

export function isString(value: unknown): value is string {
    return value instanceof String || typeof value == 'string'
}

export function isDateString(value: unknown): boolean {
    const regex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|\+[0-2]\d(?:\:[0-5]\d)?)?$/g
    return isString(value) && regex.test(value)
}

export function isAlpha(value: unknown): boolean {
    const regex = /[a-zA-Z]*/g
    return isString(value) && regex.test(value)
}

export function isAlphanumeric(value: unknown): boolean {
    const regex = /[0-9a-zA-Z]*/g
    return isString(value) && regex.test(value)
}

export function isEmail(value: unknown): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return isString(value) && regex.test(value)
}

export function isLowerCase(value: unknown): boolean {
    return isString(value) && value.toLowerCase() == value
}

export function isUpperCase(value: unknown): boolean {
    return isString(value) && value.toUpperCase() === value
}