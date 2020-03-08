import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isDivisibleBy, isNegative, isNumber, isPositive } from '../../src/helpers/number'

describe('function', function() {
    it('isDivisibleBy', function() {
        expect(isDivisibleBy(2, 1)).eq(true)
        expect(isDivisibleBy(3, 2)).eq(false)
    })

    it('isNegative', function() {
        expect(isNegative(Number.NEGATIVE_INFINITY, true)).eq(true)
        expect(isNegative(Number.NEGATIVE_INFINITY, false)).eq(false)
        expect(isNegative(-1)).eq(true)
        expect(isNegative(1)).eq(false)
    })
    
    it('isNumber', function() {
        expect(isNumber('1')).eq(false)
        expect(isNumber(new Number(0))).eq(true)
        expect(isNumber(0)).eq(true)
        expect(isNumber(Number.NaN, false, false)).eq(false)
        expect(isNumber(Number.NaN, false, true)).eq(true)
    })

    it('isPositive', function() {
        expect(isPositive(Number.NEGATIVE_INFINITY, true)).eq(false)
        expect(isPositive(-1)).eq(false)
        expect(isPositive(1)).eq(true)
    })
})