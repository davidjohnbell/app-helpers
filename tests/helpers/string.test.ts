import { describe, it } from 'mocha'
import { expect } from 'chai'
import { camelToSnake, generateId, isAlpha, isAlphanumeric, isDateString, isEmail, isLowerCase, isString, isUpperCase, snakeToCamel } from '../../src/helpers/string'

describe('string', function() {
    const snakeCase = 'key_name'
    const camelCase = 'keyName'
    const alpha = 'aBc'
    const alphanumeric = 'AbCD1234'
    const date = new Date().toISOString()
    const validEmails = ['test@domain.com', 'test.email.with.symbol@domain.com']
    const invalidEmails = ['example.com', 'A@b@c@domain.com']

    it('camelToSnake', function() {
        expect(camelToSnake(camelCase)).eq(snakeCase)
    })

    it('generateId', function() {
        const length = 25
        const id = generateId(length)
        expect(isString(id)).eq(true)
        expect(isAlpha(id)).eq(false)
        expect(isAlphanumeric(id)).eq(true)
        expect(id.length).eq(length)
    })

    it('isAlpha', function() {
        expect(isAlpha(alpha)).eq(true)
        expect(isAlpha(alphanumeric)).eq(false)
        expect(isAlpha(date)).eq(false)
    })

    it('isAlphanumeric', function() {
        expect(isAlphanumeric(alpha)).eq(true)
        expect(isAlphanumeric(alphanumeric)).eq(true)
        expect(isAlphanumeric(date)).eq(false)
    })

    it('isDateString', function() {
        expect(isDateString(alpha)).eq(false)
        expect(isDateString(alphanumeric)).eq(false)
        expect(isDateString(date)).eq(true)
    })

    it('isEmail', function() {
        validEmails.forEach(email => expect(isEmail(email)).eq(true))
        invalidEmails.forEach(email => expect(isEmail(email)).eq(false))
    })

    it('isLowerCase', function() {
        expect(isLowerCase(snakeCase)).eq(true)
        expect(isLowerCase(camelCase)).eq(false)
    })

    it('isString', function() {
        expect(isString(camelCase)).eq(true)
        expect(isString(String('123'))).eq(true)
        expect(isString(0)).eq(false)
    })

    it('isUpperCase', function() {
        expect(isUpperCase(snakeCase)).eq(false)
        expect(isUpperCase(camelCase)).eq(false)
        expect(isUpperCase('ABC')).eq(true)
    })

    it('snakeToCamel', function() {
        expect(snakeToCamel(snakeCase)).eq(camelCase)
    })
})