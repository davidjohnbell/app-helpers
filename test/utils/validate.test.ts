export function validate<T>(schema: ValidationSchema<T>, obj: Partial<T>): boolean {
    for(const [key, fns] of Object.entries(schema)) {
        if(Array.isArray(fns)) {
            for(let i = 0; i < fns.length; i++) {
                const fn = fns[i]
                if(fn(obj[key]) == false) return false
            }
        }
        else if(typeof obj[key] == typeof schema[key]) {
            if(!validate(schema[key], obj[key])) return false
        }
    }
    return true
}

type ValidationSchema<T> = { 
    [P in keyof T]?: T[P] extends string|number|boolean
    ? Array<(arg: T[P]) => boolean>
    : ValidationSchema<T[P]>
}