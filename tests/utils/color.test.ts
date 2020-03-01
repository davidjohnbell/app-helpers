import { describe, it } from 'mocha'
import { expect } from 'chai'
import { channelToHex, cmykToRgb, hexToRgb, mix, rgbToCmyk, CMYK, RGB, rgbToHex, COLOR_DEPTH } from '../../src/utils/color'

describe('color', function() {
    const rgbWhite: RGB = {
        r: COLOR_DEPTH,
        g: COLOR_DEPTH,
        b: COLOR_DEPTH
    }
    const rgbBlack: RGB = {
        r: 0,
        g: 0,
        b: 0
    }
    const cmykWhite: CMYK = {
        c: 0,
        m: 0,
        y: 0,
        k: 0
    }
    const cmykBlack: CMYK = {
        c: 0,
        m: 0,
        y: 0,
        k: 1
    }
    const hexWhite = '#FFFFFF'
    const hexBlack = '#000000'
    const hexGrey = '#808080'

    it('channelToHex', function() {
        expect(channelToHex(255)).eq('FF')
        expect(channelToHex(0)).eq('00')
    })

    it('cmykToRgb', function() {
        expect(cmykToRgb(cmykBlack)).eql(rgbBlack)
        expect(cmykToRgb(cmykWhite)).eql(rgbWhite)
    })

    it('hexToRgb', function() {
       expect(hexToRgb(hexWhite)).eql(rgbWhite)
       expect(hexToRgb(hexBlack)).eql(rgbBlack)

    })

    it('mix', function() {
        expect(mix([hexBlack, hexWhite])).eq(hexGrey)
        expect(mix([hexWhite, hexWhite])).eq(hexWhite)
        expect(mix([hexBlack, hexBlack])).eq(hexBlack)
    })

    it('rgbToCmyk', function() {
        expect(rgbToCmyk(rgbWhite)).eql(cmykWhite)
        expect(rgbToCmyk(rgbBlack)).eql(cmykBlack)
    })

    it('rgbToHex', function() {
        expect(rgbToHex(rgbBlack)).eq(hexBlack)
        expect(rgbToHex(rgbWhite)).eq(hexWhite)
    })
})