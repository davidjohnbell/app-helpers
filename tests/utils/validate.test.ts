import { describe, it } from 'mocha'
import { expect } from 'chai'
import { validate } from '../../src/utils/validate'
import { isString } from '../../src/helpers/string'
import { isNumber } from '../../src/helpers/number'
import { isObject } from '../../src/helpers/object'


describe('validate', function() {
    const schema = {
        str: [isString],
        num: [isNumber],
        obj: {
            obj: [isObject]
        }
    }
    
    it('passes schema', function() {
        const pass = validate(schema, {
            str: '',
            num: 0,
            obj: {
                obj: {}
            } 
        })
        expect(pass).eq(true)
    })

    it('fails schema', function() {
        const pass = validate(schema, {
            str: 0,
            num: '',
            obj: {
                obj: []
            } 
        })
        expect(pass).eq(false)
    })

    it('checks nested objects', function() {
        let check = false
        const fn = () => {
            check = true
            return true
        }
        const schema = {
            obj: {
                obj: [fn]
            }
        }
        const item = {
            obj: {
                obj: ''
            }
        }
        //@ts-ignore
        validate(schema, item)
        expect(check).eq(true)
    })
})