class LinkedListNode<T> {
    previous: LinkedListNode<T> | null
    next: LinkedListNode<T> | null
    value: T
    
    constructor(value: T) {
        this.previous = null
        this.next = null
        this.value = value
    }
}

export class LinkedList<T> {
    head: LinkedListNode<T> | null
    tail: LinkedListNode<T> | null

    constructor() {
        this.head = null
        this.tail = null
    }

    /**
     * @description Returns an iterator that can be spread (`...`) or used in a `for each`.
     */
    *iterator() {
        let node = this.head
        if(!node) return
        yield node.value
        while(node.next) {
            yield node.next.value
            node = node.next
        }
    }

    /**
     * @description Pushes a value onto the end of the list. 
     */
    insert(value: T) {
        let node = new LinkedListNode(value)
        if(!this.head) this.head = node
        if(!this.tail) this.tail = node
        else {
            node.previous = this.tail
            this.tail.next = node
            this.tail = node
        }
    }

    /**
     * @description Returns the `LinkedListNode` of the specified index. If the index cannot be reached then an exception is thrown.
     */
    get(index: number): LinkedListNode<T> {
        let length = this.length(), i = 0, node = this.head
        if(index < 0 || index >= length) throw new Error('index out of bounds')

        while(i < index) {
            if(node) {
                node = node.next
                i++
            }
            else throw new Error('linked list discontiguous')
        }
        return node as LinkedListNode<T>
    }

    /**
     * @description Removes the `LinkedListNode` from the list and returns it. If the index cannot be reached then an exception is thrown.
     */
    remove(index: number): LinkedListNode<T> {
        let node = this.get(index)
        let previous = node.previous
        let next = node.next
        if(previous && next) {
            previous.next = next
            next.previous = previous
        }
        else if(previous) previous.next = null
        else if(next) next.previous = null
        if(node === this.head) this.head = node.next
        else if(node === this.tail) this.tail = node.previous
        return node
    }

    /**
     * @description Calculates the length of the list by walking it. 
     */
    length(): number {
        let length = 0
        let node = this.head
        while(node) {
            length++
            node = node.next
        }
        return length
    }
}