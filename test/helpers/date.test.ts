type FutureOptions = { 
    years?: number 
    months?: number
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
}

export function future({ years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 }: FutureOptions): Date {
    const MINUTES = 60, HOURS = 60 * MINUTES, DAYS = 24 * HOURS, MONTHS = 30 * DAYS, YEARS = 12 * MONTHS 
    const now = new Date()
    const future = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
    future.setSeconds(future.getSeconds() + (years * YEARS) + (months * MONTHS) + (days * DAYS) + (hours * HOURS) + (minutes * MINUTES) + seconds)
    return future
}

export function isDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime())
}

export function minDate(date: unknown, minDate: Date): boolean {
    return date instanceof Date && date.getTime() >= minDate.getTime()
}

export function maxDate(date: unknown, maxDate: Date): boolean {
    return date instanceof Date && date.getTime() <= maxDate.getTime()
}