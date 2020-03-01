import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Lens, composeLens } from '../../src/utils/lens'

interface Point {
    x: number
    y: number
}

interface Line {
    a: Point
    b: Point
}

describe('lens', function() {
    const a: Point = {
        x: 0,
        y: 0
    }
    const b: Point = {
        x: 4,
        y: 4
    }
    const line: Line = {
        a,
        b
    }
    const lineLens: Lens<Line, Point> = {
        get: line => line.a,
        set: (line, a) => ({
            ...line,
            a
        })
    }
    const pointLens: Lens<Point, number> = {
        get: point => point.x,
        set: (point, x) => ({
            ...point,
            x
        })
    }

    it('composeLens', function() {
        const linePointLens = composeLens(lineLens, pointLens)
        expect(linePointLens.get(line)).eq(line.a.x)
        const newLine = linePointLens.set(line, 1)
        expect(newLine).not.eq(line)
        expect(newLine.a).not.eq(a)
        expect(newLine.a.x).eq(1)
    })
})