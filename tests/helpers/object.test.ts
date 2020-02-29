import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isNotEmptyObject, prop, isObject } from '../../src/helpers/object'

describe('object', function() {
    const key = 'key'
    const value = 1
    const empty = {}
    const full = { [key]: value }
    const arr = []

    it('isNotEmptyObject', function() {
        expect(isNotEmptyObject(empty)).eq(true)
        expect(isNotEmptyObject(full)).eq(false)
    })

    it('prop', function() {
        expect(prop(full, key)).eq(value)
    })

    it('isObject', function() {
        expect(isObject(empty)).eq(true)
        expect(isObject(full)).eq(true)
        expect(isObject(key)).eq(false)
        expect(isObject(value)).eq(false)
        expect(isObject(arr)).eq(false)
    })
})