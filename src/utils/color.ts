export interface RGB {
    r: number
    g: number
    b: number
}

export interface CMYK {
    c: number
    m: number
    y: number
    k: number
}

export const COLOR_BASE = 16
export const COLOR_DEPTH = 255

export function mix(hexs: string[]): string {
    let cmyk = hexs
        .map(hex => hexToRgb(hex))
        .map(rgb => rgbToCmyk(rgb))
        .reduce((acc, cur) => {
            acc.c += cur.c
            acc.m += cur.m
            acc.y += cur.y
            acc.k += cur.k
            return acc
        })
    Object.keys(cmyk).forEach(key => cmyk[key] /= hexs.length)
    return rgbToHex(cmykToRgb(cmyk))
}

export function opposite(hex: string): string {
    let rgb = hexToRgb(hex)
    let r = Math.round(Math.sqrt(COLOR_DEPTH - rgb.r))
    let g = Math.round(Math.sqrt(COLOR_DEPTH - rgb.g))
    let b = Math.round(Math.sqrt(COLOR_DEPTH - rgb.b))
    return rgbToHex({ r, g, b })
}

export function rgbToHex(rgb: RGB) {
    let rHex = channelToHex(rgb.r)
    let gHex = channelToHex(rgb.g)
    let bHex = channelToHex(rgb.b)
    return `#${rHex}${gHex}${bHex}`
}

export function channelToHex(channel: number) {
    let hex = channel.toString(COLOR_BASE)
    return hex.length == 1 ? '0' + hex : hex
}

export function rgbToCmyk(rgb: RGB): CMYK {
    let c = rgb.r / COLOR_DEPTH
    let m = rgb.g / COLOR_DEPTH
    let y = rgb.b / COLOR_DEPTH
    if(rgb.r == 0 && rgb.g == 0 && rgb.b == 0) return { c: 0, m: 0, y: 0, k: 1 }
    else if(rgb.r == COLOR_DEPTH && rgb.g == COLOR_DEPTH && rgb.b == COLOR_DEPTH) return { c: 0, m: 0, y: 0, k: 0 }
    
    let k = Math.min(1 - c, 1 - m, 1 - y)
    c = (1 - c - k) / (1 - k)
    m = (1 - m - k) / (1 - k)
    y = (1 - y - k) / (1 - k)
    return { c, y, m, k }
}

export function cmykToRgb(cmyk: CMYK) {
    let { c, m, y, k } = cmyk
    let r = 1 - Math.min(1, c * (1 - k) + k)
    let g = 1 - Math.min(1, m * (1 - k) + k)
    let b = 1 - Math.min(1, y * (1 - k) + k)
    r = Math.round(r * COLOR_DEPTH)
    g = Math.round(g * COLOR_DEPTH)
    b = Math.round(b * COLOR_DEPTH)
    return { r, g, b }
}

export function hexToRgb(hex: string): RGB {
    hex = this.replaceShorthand(hex)
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if(result) {
        let r = parseInt(result[1], this.COLOR_BASE)
        let g = parseInt(result[2], this.COLOR_BASE)
        let b = parseInt(result[3], this.COLOR_BASE)
        return { r, g, b }
    }
    else throw new Error('illegal argument')
}

export function randomHexColor(): string {
    let random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
    let r = random(0, COLOR_DEPTH)
    let g = random(0, COLOR_DEPTH)
    let b = random(0, COLOR_DEPTH)
    return rgbToHex({ r, g, b })
}

export function replaceShorthandHex(hex: string): string {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    return hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)
}