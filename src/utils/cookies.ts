import { snakeToCamel, camelToSnake } from '../helpers/string'

type Cookies = { [key: string]: string }
export interface Cookie {
    key: string
    value: string
    expires?: Date
    maxAge?: number
    domain?: string
    path?: string
    secure?: boolean
    httpOnly?: boolean
}

export function parseCookies(cookieStr: string): Cookies {
    const COOKIE_DELIM = ';', KEY_VALUE_DELIM = '='
    return cookieStr.split(COOKIE_DELIM).reduce((cookies: Cookies, cookie) => {
        const indexOf = cookie.lastIndexOf(KEY_VALUE_DELIM)
        const key = snakeToCamel(cookie.substr(0, indexOf).trim())
        const value = cookie.substr(indexOf + 1, cookie.length).trim()
        cookies[key] = value
        return cookies
    }, {})
}

export function serializeCookie(options: Cookie, pad: number = 0): { setCookie: string, cookieStr: string } {
    const SPACE = ' ', PADDED = SPACE.repeat(pad++)
    let cookieStr = `${camelToSnake(options.key).toLowerCase()}=${options.value.trim()}`
    if(options.expires) cookieStr += `; Expires=${options.expires.toUTCString()}`
    if(options.maxAge) cookieStr += `; Max-Age=${options.maxAge}`
    if(options.domain) cookieStr += `; Domain=${options.domain}`
    if(options.path) cookieStr += `; Path=${options.path}`
    if(options.secure) cookieStr += '; Secure'
    if(options.httpOnly) cookieStr += '; HttpOnly'
    const setCookie = `Set-Cookie${PADDED}`
    return { setCookie, cookieStr }
}