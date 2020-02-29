export class Queue<T> {
    readonly capacity: number
    private arr: Array<T>

    constructor(capacity: number) {
        this.capacity = capacity
        this.arr = []    
    }

    /**
     * @description The current length of the queue.
     */
    get length(): number {
        return this.arr.length
    }

    /**
     * @description Adds an item to the queue displacing the head if necessary.
     */
    add(item: T) {
        this.arr.push(item)
        if(this.arr.length > this.capacity) this.arr.shift()
    }

    /**
     * @description Adds every item to the queue displacing multiple elements if necessary.
     */
    addAll(items: Array<T>) {
        items.forEach(item => this.add(item))
    }

    /**
     * @description Clears the contents of the queue.
     */
    clear() {
        this.arr = []
    }

    /**
     * @description Checks to see if the queue contains an element.
     */
    contains(item: T): boolean {
        return this.arr.includes(item)
    }

    /**
     * @description Checks to see if the queue contains every element of the input array.
     */
    containsAll(items: Array<T>): boolean {
        return items.every(item => this.arr.includes(item))
    }

    /**
     * @description If the queue has no elements then it is empty.
     */
    isEmpty(): boolean {
        return this.arr.length == 0
    }

    /**
     * @description Removes the item from the queue. If successful then the item is returned.
     */
    remove(item: T): T | null {
        let index = this.arr.indexOf(item)
        if(index >= 0) {
            let [ spliced ] = this.arr.splice(index, 1)
            return spliced
        }
        else return null
    }

    /**
     * @description Removes all elements of the input array from the queue. Successful deletions are returned in a new array.
     */
    removeAll(items: Array<T>): Array<T> {
        let removed: Array<T> = []
        items.forEach(item => {
            let rem = this.remove(item)
            if(rem) removed.push(rem)
        })
        return removed
    }

    /**
     * @description Will add an element to the queue if the queue isn't already at capacity.
     */
    offer(item: T) {
        if(this.arr.length < this.capacity) this.arr.push(item)
    }

    /**
     * @description Retreives and removes first element of the queue `null` otherwise.
     */
    poll(): T | null {
        if(this.isEmpty()) return null
        else return this.arr.shift() as T
    }

    /**
     * @description Retreives the first element of the queue `null` otherwise.
     */
    peak(): T | null {
        if(this.isEmpty()) return null
        else return this.arr[0]
    }

    /**
     * @description Returns an iterator that can be spread (`...`) or used in a `for each`.
     */
    *iterator() {
        if(this.isEmpty()) return
        let i = 0
        while(i < this.arr.length) {
            yield this.arr[i]
            i++
        }
    }

    /**
     * @description Returns an array of the queued elements.
     */
    toArray(): Array<T> {
        return this.arr.slice()
    }
}