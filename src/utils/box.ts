export interface Box {
    x: number
    y: number
    h: number
    w: number
}

export function adjacent(a: Box, b: Box): boolean {
    const aRightOfB = b.x + b.w == a.x && b.y == a.y
    const aBelowB = b.y + b.h == a.y && b.x == a.x
    const aLeftOfB = a.x + a.w == b.x && a.y == b.y
    const aAboveB = a.y + a.h == b.y && a.x == b.x
    return aRightOfB || aBelowB || aLeftOfB || aAboveB
}

export function union(a: Box, b: Box): Box | null {
    if(!intersects(a, b)) return null
    return {
        x: Math.max(a.x, b.x),
        y: Math.max(a.y, b.y),
        w: Math.min(a.x + a.w - b.x, b.x + b.w - a.x),
        h: Math.min(a.y + a.h - b.y, b.y + b.h - a.y)
    }
}

export function intersects(a: Box, b: Box): boolean {
    const aLeftOfB = a.x + a.w <= b.x
    const aRightOfB = a.x >= b.x + b.w
    const aAboveB = a.y + a.h <= b.y
    const aBelowB = a.y >= b.y + b.h
    return !(aRightOfB || aLeftOfB || aBelowB || aAboveB) 
}

export function contains(a: Box, b: Box): boolean {
    const w = b.x + b.w <= a.x + a.w
    const x = b.x >= a.x
    const y = b.y >= a.y
    const h = b.y + b.h <= a.y + a.h
    return w && x && y && h
}

export function canFit(a: Box, b: Box): boolean {
    const w = b.w <= a.w
    const h = b.h <= a.h
    return w && h
}