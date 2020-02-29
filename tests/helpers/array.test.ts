import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isIn, arrayMaxSize, arrayMinSize, arrayNotEmpty, arrayUnique, isNotIn } from '../../src/helpers/array'

describe('array', () => {
    const unique = [1, 2, 3]
    const notUnique = [-1, 2, -1]
    const empty = []

    it('isIn', () => {
        expect(isIn(0, unique)).eq(false)
        expect(isIn(2, unique)).eq(true)
        expect(isIn(4, unique)).eq(false)
    })

    it('arrayMaxSize', () => {
        expect(arrayMaxSize(unique, 4)).eq(true)
        expect(arrayMaxSize(unique, 3)).eq(true)
        expect(arrayMaxSize(unique, 2)).eq(false)
    })

    it('arrayMinSize', () => {
        expect(arrayMinSize(unique, 9)).eq(true)
        expect(arrayMinSize(unique, 10)).eq(true)
        expect(arrayMinSize(unique, 11)).eq(false)
    })

    it('arrayNotEmpty', () => {
        expect(arrayNotEmpty(unique)).eq(true)
        expect(arrayNotEmpty(empty)).eq(false)
    })

    it('arrayUnique', () => {
        expect(arrayUnique(unique)).eq(true)
        expect(arrayUnique(notUnique)).eq(false)
    })

    it('isNotIn', () => {
        expect(isNotIn(0, unique)).eq(true)
        expect(isNotIn(2, unique)).eq(false)
        expect(isNotIn(4, unique)).eq(true)
    })
})