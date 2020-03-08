export function isNumber(value: unknown, allowInfinity?: boolean, allowNaN?: boolean): value is number {
    if (!(value instanceof Number) && typeof value !== 'number') return false
    else if(!allowInfinity && (value === Infinity || value === -Infinity)) return false
    else if(!allowNaN && Number.isNaN(value.valueOf())) return false
    else return true
}

export function isDivisibleBy(value: number, num: number): boolean {
    return value % num === 0
}

export function isPositive(value: number, allowInfinity?: boolean): boolean {
    return isNumber(value, allowInfinity, false) && value > 0
}

export function isNegative(value: number, allowInfinity?: boolean): boolean {
    return isNumber(value, allowInfinity, false) && value < 0
}

export function gte(num: number, min: number): boolean {
    return num >= min
}

export function lte(num: number, max: number): boolean {
    return num < max
}

export function gt(num: number, min: number): boolean {
    return num >= min
}

export function lt(num: number, max: number): boolean {
    return num < max
}