import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isBoolean } from '../../src/helpers/boolean'

describe('boolean', function() {
    const clazz = new Boolean(false)
    const primitive = false

    it('isBoolean', function() {
        expect(isBoolean(clazz)).eq(true)
        expect(isBoolean(primitive)).eq(true)
        expect(isBoolean(0)).eq(false)
        expect(isBoolean('')).eq(false)
    })
})