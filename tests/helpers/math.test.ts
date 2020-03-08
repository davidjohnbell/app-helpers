import { describe, it } from 'mocha'
import { expect } from 'chai'
import { normalize, rouletteWheel, randomBetween } from '../../src/helpers/math'

describe('math', function() {
    it('normalize', function() {
        expect(normalize([1, 2, 3])).eql([1/6, 2/6, 3/6])
    })

    it('rouletteWheel', function() {
        const numbers = [1, 2, 4, 8, 16, 32]
        const spin = rouletteWheel(numbers)
        for(let i = 0; i < 100; i++) {
            expect(numbers).to.include(spin())
        }
    })

    it('randomBetween', function() {
        const min = 0, max = 100
        let r: number
        for(let i = 0; i < 100; i++) {
            r = randomBetween(min, max)
            expect(r).gte(min)
            expect(r).lte(max)
        }
    })
})