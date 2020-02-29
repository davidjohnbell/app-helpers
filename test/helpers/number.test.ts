import { equals } from './common'

export function isNumber(value: unknown, allowInfinity?: boolean, allowNaN?: boolean): value is number {
    if (!(value instanceof Number) && typeof value !== 'number') return false
    else if(!allowInfinity && (value === Infinity || value === -Infinity)) return false
    else if(!allowNaN && Number.isNaN(value.valueOf())) return false
    else return true
}

export function isDivisibleBy(value: unknown, num: number): boolean {
    if(isNumber(value)) return equals(value % num, 0)
    else return false
}

export function isPositive(value: unknown, allowInfinity?: boolean): boolean {
    return isNumber(value, allowInfinity, false) && value > 0
}

export function isNegative(value: unknown, allowInfinity?: boolean): boolean {
    return isNumber(value, allowInfinity, false) && value < 0
}

export function min(num: unknown, min: number): boolean {
    return isNumber(num) && num >= min
}

export function max(num: unknown, max: number): boolean {
    return isNumber(num) && num <= max
}