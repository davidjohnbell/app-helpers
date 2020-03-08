export function snakeToCamel(str: string): string {
    return str.replace(/([-_][a-z])/g, group => {
        return group.toUpperCase().replace('-', '').replace('_', '')
    })
}

export function camelToSnake(str: string) {
    return str.replace(/[A-Z]/g, letter => {
        return `_${letter.toLowerCase()}`
    })
}

export function generateId(length: number) {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for(let i = 0; i < length; i++ ) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
    }
    return result
}

export function isString(value: unknown): value is string {
    return value instanceof String || typeof value == 'string'
}

export function isDateString(value: unknown): boolean {
    const regex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|\+[0-2]\d(?:\:[0-5]\d)?)?$/g
    return isString(value) && regex.test(value)
}

export function isAlpha(value: unknown): boolean {
    const regex = /^[a-zA-Z]*$/g
    return isString(value) && regex.test(value)
}

export function isAlphanumeric(value: unknown): boolean {
    const regex = /^[0-9a-zA-Z]*$/g
    return isString(value) && regex.test(value)
}

export function isEmail(value: unknown): boolean {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return isString(value) && regex.test(value)
}

export function isLowerCase(value: unknown): boolean {
    return isString(value) && value.toLowerCase() == value
}

export function isUpperCase(value: unknown): boolean {
    return isString(value) && value.toUpperCase() === value
}

/**
 * @description Levenshtein distance is a string metric for measuring the difference 
 * between two sequences. Informally, the Levenshtein distance between two 
 * words is the minimum number of single-character edits required to 
 * change one word into the other. The distance between the two words
 * is returned.
 */
export function levenshteinDistance(a: string, b: string): number {
    if(a.length == 0) return b.length
    if(b.length == 0) return a.length

    let matrix: number[][] = []
    for(let i = 0; i < b.length; i++) {
        matrix[i] = [i]
    }
    for(let j = 0; j < a.length; j++) {
        matrix[0][j] = j
    }
    for(let i = 1; i < b.length; i++) {
        for(let j = 1; j < a.length; j++) {
            if(b.charAt(i - 1) == a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1]
            else {
                const substitution = matrix[i - 1][j - 1] + 1
                const insertion = matrix[i][j - 1] + 1
                const deletion = matrix[i - 1][j] + 1
                matrix[i][j] = Math.min(substitution, Math.min(insertion, deletion))
            }
        }
    }
    return matrix[b.length - 1][a.length - 1]
}