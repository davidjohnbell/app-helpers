import { describe, it } from 'mocha'
import { expect } from 'chai'
import { } from '../../dist'

describe('array', function() {
    it('add', function() {
        let result = Calculator.Sum(5, 2);
        expect(result).equal(7);
    }) 
})

export function isIn(value: unknown, possibleValues: unknown[]): boolean {
    return Array.isArray(value) && possibleValues.some(possibleValue => possibleValue === value)
}

export function isNotIn(value: unknown, possibleValues: unknown[]): boolean {
    return !possibleValues.some(possibleValue => possibleValue === value)
}

export function arrayNotEmpty(array: unknown): boolean {
    return Array.isArray(array) && array.length > 0
}

export function arrayMinSize(array: unknown, min: number): boolean {
    return Array.isArray(array) && array.length >= min
}

export function arrayMaxSize(array: unknown, max: number): boolean {
    return Array.isArray(array) && array.length <= max
}

export function arrayUnique(array: unknown): boolean {
    if (Array.isArray(array)) {
        for(let i = 0; i < array.length - 1; i++) {
            for(let j = i + 1; j < array.length; j++) {
                if(array[i] === array[j]) return false
            }
        }
    }
    return true
}