import { describe, it } from 'mocha'
import { expect } from 'chai'
import { parseCookies, serializeCookie } from '../../src/utils/cookies'

describe('cookies', function() {
    const key1 = 'key1', value1 = 'value1'
    const key2 = 'key2', value2 = 'value2'
    const cookiesStr = `${key1}=${value1}; ${key2} = ${value2}`
    const cookies = {
        [key1]: value1,
        [key2]: value2
    }
    const domain = 'example.com'
    const path = '/'

    it('parseCookies', function() {
        expect(parseCookies(cookiesStr)).eql(cookies)
    })

    it('serializeCookie', function() {
        const { cookieStr } = serializeCookie({
            key: key1,
            value: value1,
            secure: true,
            httpOnly: true,
            expires: new Date(),
            maxAge: 20000,
            domain,
            path
        })
        expect(cookieStr).to.be.a('string')
        expect(cookieStr).to.include(key1)
        expect(cookieStr).to.includes(value1)
        expect(cookieStr).to.includes('Expires=')
        expect(cookieStr).to.includes('Max-Age=')
        expect(cookieStr).to.includes('Secure')
        expect(cookieStr).to.includes('HttpOnly')
    })
})