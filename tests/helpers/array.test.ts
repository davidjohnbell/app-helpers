import { describe, it } from 'mocha'
import { expect } from 'chai'
import { isIn, arrayMaxSize, arrayMinSize, arrayNotEmpty, arrayUnique, isNotIn, zip, binaryInsert, binarySearch } from '../../src/helpers/array'

describe('array', function() {
    const unique = [1, 2, 3]
    const notUnique = [-1, 2, -1]
    const zipped = [[1, -1], [2, 2], [3, -1]]
    const empty = []

    it('isIn', function() {
        expect(isIn(1, unique)).eq(true)
        expect(isIn(3, unique)).eq(true)
        expect(isIn(0, unique)).eq(false)
        expect(isIn(4, unique)).eq(false)
    })

    it('arrayMaxSize', () => {
        expect(arrayMaxSize(unique, 4)).eq(true)
        expect(arrayMaxSize(unique, 3)).eq(true)
        expect(arrayMaxSize(unique, 2)).eq(false)
    })

    it('arrayMinSize', function() {
        expect(arrayMinSize(empty, 0)).eq(true)
        expect(arrayMinSize(unique, 3)).eq(true)
        expect(arrayMinSize(unique, 4)).eq(false)
    })

    it('arrayNotEmpty', function() {
        expect(arrayNotEmpty(unique)).eq(true)
        expect(arrayNotEmpty(empty)).eq(false)
    })

    it('arrayUnique', function() {
        expect(arrayUnique(unique)).eq(true)
        expect(arrayUnique(notUnique)).eq(false)
    })

    it('isNotIn', function() {
        expect(isNotIn(0, unique)).eq(true)
        expect(isNotIn(2, unique)).eq(false)
        expect(isNotIn(4, unique)).eq(true)
    })

    it('zip', function() {
        expect(zip(unique, notUnique)).eql(zipped)
        expect(zip(empty, notUnique)).eql(empty)
    })

    it('binaryInsert', function() {
        const compareFn = (a: number, b: number) => a - b
        const array: Array<number> = []
        expect(binaryInsert(array, compareFn, 2)).eql([2])
        expect(binaryInsert(array, compareFn, 0)).eql([0, 2])
        expect(binaryInsert(array, compareFn, 4)).eql([0, 2, 4])
        expect(binaryInsert(array, compareFn, 1)).eql([0, 1, 2, 4])
        expect(binaryInsert(array, compareFn, 3)).eql([0, 1, 2, 3, 4])
    })

    it('binarySearch', function() {
        const compareFn = (a: number, b: number) => a - b
        const array: Array<number> = [0, 1, 2, 3]
        expect(binarySearch(array, compareFn, -1)).eq(-1)
        expect(binarySearch(array, compareFn, 4)).eq(-1)
        expect(binarySearch(array, compareFn, 0)).eq(0)
        expect(binarySearch(array, compareFn, 3)).eq(3)
        expect(binarySearch(array, compareFn, 2)).eq(2)
    })
})