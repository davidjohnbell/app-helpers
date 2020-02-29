import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import { Queue } from '../../src/structures/queue'

describe('Queue', function() {
    const capacity = 10
    let queue: Queue<number>

    beforeEach(function() {
        queue = new Queue(capacity)
        for(let i = 0; i < capacity; i++) {
            queue.add(i)
        }
    })
    
    it('iterator', function() {
        let i = 0
        for(let value of queue.iterator()) {
            expect(value).eq(i++)
        }
    })

    it('add', function() {
        for(let i = 0; i < capacity * 2; i++) {
            queue.add(i)
            expect(queue.length).eq(capacity)
        }
    })

    it('addAll', function() {
        const items = [1, 2, 3]
        queue.addAll(items)
        expect(queue.length).eq(capacity)
    })

    it('clear', function() {
        queue.clear()
        expect(queue.length).eq(0)
    })

    it('contains', function() {
        for(let i = 0; i < capacity; i++) {
            expect(queue.contains(i)).eq(true)
        }
    })

    it('containsAll', function() {
        let items = [1, 2, 3]
        expect(queue.containsAll(items)).eq(true)
        expect(queue.containsAll([-1])).eq(false)
    })

    it('isEmpty', function() {
        expect(queue.isEmpty()).eq(false)
        queue.clear()
        expect(queue.isEmpty()).eq(true)
    })

    it('remove', function() {
        expect(queue.remove(-1)).to.be.null
        expect(queue.remove(11)).to.be.null
        expect(queue.remove(5)).eq(5)
        expect(queue.remove(0)).eq(0)
        expect(queue.length).eq(capacity - 2)
    })

    it('removeAll', function() {
        expect(queue.length).eq(capacity)
        expect(queue.removeAll([Number.POSITIVE_INFINITY]).length).eq(0)
        const toRemove = queue.toArray()
        const removed = queue.removeAll(toRemove)
        expect(removed).eql(toRemove)
        expect(queue.length).eq(0)
        expect(removed.length).eq(toRemove.length)
    })

    it('offer', function() {
        queue.offer(Number.POSITIVE_INFINITY)
        expect(queue.remove(Number.POSITIVE_INFINITY)).to.be.null
    })

    it('poll', function() {
        let empty = new Queue(capacity)
        expect(empty.poll()).to.be.null
        expect(queue.poll()).not.to.be.null
        expect(queue.length).lessThan(capacity)
    })

    it('peak', function() {
        let empty = new Queue(capacity)
        expect(empty.peak()).to.be.null
        expect(queue.peak()).not.to.be.null
        expect(queue.length).eq(capacity)
    })
})