import { describe, it } from 'mocha'
import { expect } from 'chai'
import { equals, isDefined, isEmpty, length, maxLength, minLength, notEquals } from '../../src/helpers/common'

describe('common', function() {
    const str = '123'
    const arr = [1, 2, 3]
    const _null = null
    const _undefined = undefined
    const obj = {}
    const empty = ''
    
    it('equals', function() {
        expect(equals(obj, obj)).eq(true)
        expect(equals(str, arr)).eq(false)
    })

    it('isDefined', function() {
        expect(isDefined(str)).eq(true)
        expect(isDefined(arr)).eq(true)
        expect(isDefined(_null)).eq(false)
        expect(isDefined(_undefined)).eq(false)
    })

    it('isEmpty', function() {
        expect(isEmpty(str)).eq(false)
        expect(isEmpty(arr)).eq(false)
        expect(isEmpty(_null)).eq(true)
        expect(isEmpty(_undefined)).eq(true)
        expect(isEmpty(obj)).eq(true)
        expect(isEmpty(empty)).eq(true)
    })

    it('length', function() {
        expect(length(str, str.length)).eq(true)
        expect(length(arr, arr.length)).eq(true)
        expect(length(str, 0, 2)).eq(false)
        expect(length(arr, 0, 2)).eq(false)
    })

    it('maxLength', function() {
        expect(maxLength(str, 0)).eq(false)
        expect(maxLength(arr, arr.length)).eq(true)
    })

    it('minLength', function() {
        expect(minLength(str, 0)).eq(true)
        expect(minLength(arr, arr.length)).eq(true)
    })
    
    it('notEquals', function() {
        expect(notEquals(str, str)).eq(false)
        expect(notEquals(arr, str)).eq(true)
    })
})