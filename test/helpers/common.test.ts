import { isString } from './string'
import { isNumber } from './number'

export function isDefined(value: unknown): boolean {
    return value !== undefined && value !== null
}
    
export function equals(value: unknown, comparison: unknown): boolean {
    return value === comparison
}

export function notEquals(value: unknown, comparison: unknown): boolean {
    return value !== comparison
}

export function isEmpty(value: unknown): boolean {
    return value === '' || value === null || value === undefined
}

export function isNotEmpty(value: unknown): boolean {
    return value !== '' && isDefined(value)
}

export function length(value: unknown, min: number, max?: number): boolean {
    if(Array.isArray(value) || isString(value)) return value.length >= min && isNumber(max) ? value.length <= max : true
    else return false
}

export function minLength(value: unknown, min: number): boolean {
    return length(value, min)
}

export function maxLength(value: unknown, max: number): boolean {
    return length(value, 0, max)
}