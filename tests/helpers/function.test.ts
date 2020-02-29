import { describe, it } from 'mocha'
import { expect, assert } from 'chai'
import { compose, curry, isFunction, pipe } from '../../src/helpers/function'

describe('function', function() {
    const addOne = (num: number) => num + 1
    const addTwo = (num: number) => num + 2
    const add = (a: number, b: number) => a + b
    const one = 1, two = 2, three = one + two
    
    it('compose', function() {
        const addThree = compose(addOne, addTwo)
        const _addThree = compose(addTwo, addOne)
        expect(addThree(0)).eq(3)
        expect(_addThree(0)).eq(3)
    })

    it('curry', function() {
        const curried = curry(add, one)
        if(isFunction(curried)) {
            const res = curried(two)
            expect(res).eq(three)
        }
        else assert.fail()
    })

    it('isFunction', function() {
        expect(isFunction(addOne)).eq(true)
        expect(isFunction({})).eq(false)
    })

    it('pipe', function() {
        const addThree = pipe(addOne, addTwo)
        expect(isFunction(addThree))
        expect(addThree(0)).eq(3)
    })
})