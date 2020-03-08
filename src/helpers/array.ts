export function isIn(value: unknown, possibleValues: Array<unknown>): boolean {
    return possibleValues.some(possibleValue => possibleValue === value)
}

export function isNotIn(value: unknown, possibleValues: Array<unknown>): boolean {
    return possibleValues.every(possibleValue => possibleValue !== value)
}

export function arrayNotEmpty(array: Array<unknown>): boolean {
    return array.length > 0
}

export function arrayMinSize(array: Array<unknown>, min: number): boolean {
    return array.length >= min
}

export function arrayMaxSize(array: Array<unknown>, max: number): boolean {
    return array.length <= max
}

export function arrayUnique(array: Array<unknown>): boolean {
    for(let i = 0; i < array.length - 1; i++) {
        for(let j = i + 1; j < array.length; j++) {
            if(array[i] === array[j]) return false
        }
    }
    return true
}

export function zip<T, U>(t: Array<T>, u: Array<U>): Array<[T, U]>
export function zip<T, U, V>(t: Array<T>, u: Array<U>, v: Array<V>): Array<[T, U, V]>
export function zip<T, U, V, W>(t: Array<T>, u: Array<U>, v: Array<V>): Array<[T, U, V, W]>
export function zip(...arrays: Array<Array<unknown>>): Array<Array<unknown>> {
    const tupleSize = Math.min(...arrays.map(array => array.length))
    const zipped: Array<Array<unknown>> = Array(tupleSize)
    for(let i = 0; i < tupleSize; i++) {
        zipped[i] = Array(arrays.length)
        for(let j = 0; j < arrays.length; j++) {
            zipped[i][j] = arrays[j][i]
        }
    }
    return zipped
}

export function binarySearch<T>(sorted: Array<T>, compareFn: (a: T, b: T) => number, item: T, left: number = 0, right: number = sorted.length): number {
    if(sorted.length == 0) return -1
    else if(left == right) return compareFn(item, sorted[left]) == 0 ? left : -1

    const mid = left + Math.floor((right - left) / 2)
    const result = compareFn(item, sorted[mid])
    
    if (result > 0) return binarySearch(sorted, compareFn, item, mid + 1, right)
    else if(result < 0) return binarySearch(sorted, compareFn, item, left, mid - 1)
	else return mid
}

export function binaryInsert<T>(sorted: Array<T>, compareFn: (a: T, b: T) => number, item: T): Array<T> {
    if(sorted.length == 0) sorted.push(item)
    else sorted.splice(insertAt(sorted, compareFn, item), 0, item)
    return sorted
}

function insertAt<T>(sorted: Array<T>, compareFn: (a: T, b: T) => number, item: T, left: number = 0, right: number = sorted.length): number {
    if (left == right) {
        return compareFn(item, sorted[left]) > 0 ? left + 1 : left
    }

	const mid = left + Math.floor((right - left) / 2)
	const result = compareFn(item, sorted[mid])

    if (result > 0) return insertAt(sorted, compareFn, item, mid + 1, right)
    else if(result < 0) return insertAt(sorted, compareFn, item, left, mid)
	else return mid
}