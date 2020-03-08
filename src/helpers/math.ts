import { isNumber } from './number'

export function normalize(scores: number[]): number[] {
    const normalized: Array<number> = Array(scores.length)
    const sum = scores.reduce((acc, cur) => acc + cur)
    for(let i = 0; i < scores.length; i++) {
        normalized[i] = scores[i] / sum
    }
    return normalized
}

export function rouletteWheel(numbers: Array<number>): () => number {
    const starts: Array<number> = Array(numbers.length)
    const ends: Array<number> = Array(numbers.length)
    const sum = numbers.reduce((acc, cur) => acc + cur)
    let top = 0
    for(let i = 0; i < numbers.length; i++) {
        let f =  numbers[i] / sum
        starts[i] = top
        ends[i] = top + f
        top += f
    }
    return () => spin(starts, ends, numbers)
}

function spin(starts: Array<number>, ends: Array<number>, numbers: Array<number>): number {
    const r = Math.random()
    let selected = numbers[0]
    for(let i = 0; i < starts.length; i++) {
        if(starts[i] <= r && r <= ends[i]) {
            selected = numbers[i]
            break
        }
    }
    return selected
}

export function randomBetween(min: number, max: number): number {
    if(isNumber(min, false, false) && isNumber(max, false, false)) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    else throw new Error('illegal arguments exception')
}