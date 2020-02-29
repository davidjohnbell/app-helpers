import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import { LinkedList } from '../../src/structures/linkedList'

describe('LinkedList', function() {
    const length = 10
    let list: LinkedList<number>

    beforeEach(function() {
        const length = 10
        list = new LinkedList<number>()
        for(let i = 0; i < length; i++) {
            list.insert(i)
        }
    })
    
    it('iterator', function() {
        let i = 0
        for(let value of list.iterator()) {
            expect(value).eq(i++)
        }
    })

    it('insert', function() {
        expect(list.length()).eq(length)
    })

    it('get', function() {
        expect(() => list.get(-1)).to.throw()
        expect(() => list.get(length)).to.throw()
        for(let i = 0; i < length; i++) {
            expect(list.get(i).value).eq(i)
        }
    })

    it('remove', function() {
        expect(() => list.remove(-1)).to.throw()
        expect(() => list.remove(length)).to.throw()
        
        let node = list.remove(0)
        expect(node.next).not.to.be.null
        expect(list.length()).eq(length - 1)

        node = list.remove(list.length() - 1)
        expect(node).not.to.be.null
        expect(list.length()).eq(length - 2)
    })

    it('length', function() {
        expect(list.length()).eq(length)
    })
})