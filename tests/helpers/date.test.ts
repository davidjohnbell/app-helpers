import { describe, it } from 'mocha'
import { expect } from 'chai'
import { future, isDate, before, after } from '../../src/helpers/date'

describe('date', function() {
    const date = new Date()
    const year = future({ years: 1 })
    const month = future({ months: 1 })
    const day = future({ days: 1 })
    const hour = future({ hours: 1 })
    const minute = future({ minutes: 1 })
    const second = future({ seconds: 1 })
    
    it('future', function() {
        expect(year).greaterThan(month)
        expect(month).greaterThan(day)
        expect(day).greaterThan(hour)
        expect(hour).greaterThan(minute)
        expect(minute).greaterThan(second)
    })

    it('isDate', function() {
        expect(isDate(date)).eq(true)
        expect(isDate(year)).eq(true)
        expect(isDate(false)).eq(false)
    })

    it('before', function() {
        expect(before(year, month)).eq(false)
        expect(before(second, month)).eq(true)
    })

    it('after', function() {
        expect(after(month, year)).eq(false)
        expect(after(month, second)).eq(true)
    })
})