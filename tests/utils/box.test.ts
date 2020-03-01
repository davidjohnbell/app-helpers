import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Box, adjacent, canFit, contains, intersects, union } from '../../src/utils/box'

describe('box', function() {
    const a: Box = {
        h: 1,
        w: 1,
        x: 1,
        y: 1
    }

    const b: Box = {
        h: 1,
        w: 1,
        x: 1,
        y: 2
    }

    const c: Box = {
        h: 2,
        w: 2,
        x: 2,
        y: 2
    }

    const d: Box = {
        h: 3,
        w: 3,
        x: 0,
        y: 0
    }

    const e: Box = {
        h: 1,
        w: 1,
        x: 2,
        y: 2
    }

    it('adjacent', function() {
        expect(adjacent(a, b)).eq(true)
        expect(adjacent(b, a)).eq(true)
        expect(adjacent(a, c)).eq(false)
        expect(adjacent(c, d)).eq(false)
        expect(adjacent(d, c)).eq(false)
    })

    it('canFit', function() {
        expect(canFit(a, b)).eq(true)
        expect(canFit(c, a)).eq(true)
        expect(canFit(a, c)).eq(false)
        expect(canFit(d, c)).eq(true)
        expect(canFit(c, d)).eq(false)
    })

    it('contains', function() {
       expect(contains(d, a)).eq(true)
       expect(contains(d, b)).eq(true)
       expect(contains(a, b)).eq(false)
       expect(contains(d, c)).eq(false)
    })

    it('intersects', function() {
        expect(intersects(a, b)).eq(false)
        expect(intersects(b, c)).eq(false)
        expect(intersects(d, a)).eq(true)
        expect(intersects(a, d)).eq(true)
        expect(intersects(d, c)).eq(true)
    })

    it('union', function() {
        expect(union(d, c)).eql(e)
        expect(union(a, d)).eql(a)
        expect(union(c, e)).eql(e)
    })
})