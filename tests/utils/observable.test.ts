import { describe, it } from 'mocha'
import { expect } from 'chai'
import { interval, map, merge, multicast, stream, switchMap, zip } from '../../src/utils/observable'


describe('observable', function() {
    const delay = 5
    const double = (num: number) => num * 2
    const count = [0, 1, 2]
    const doubleCount = count.slice().map(double)
    const makeObserver = (arr: Array<number>) => {
        const vars = {
            iterations: 0,
            completed: false,
            error: false
        }
        const observer = {
            next: (num: number) => expect(num).eq(arr[vars.iterations++]),
            complete: () => vars.completed = true,
            error: () => vars.error = true
        }
        return { observer, vars }
    }

    it('interval', function(done) {
        const observable = interval(delay)
        const unsub = observable({
            next: num => {
                if(num >= count.length) {
                    unsub()
                    done()
                }
            }
        })
    })

    it('stream', function() {
        const { vars, observer } = makeObserver(count)
        const observable = stream(count)
        observable(observer)
        expect(vars.completed).eq(true)
        expect(vars.error).eq(false)
        expect(vars.iterations).eq(count.length)
    })

    it('map', function() {
        const { vars, observer } = makeObserver(doubleCount)
        const observable = map(stream(count), double)
        observable(observer)
        expect(vars.iterations).eq(count.length)
        expect(vars.completed).eq(true)
        expect(vars.error).eq(false)
    })

    it('merge', function() {
        let completed = false
        let error = false
        let iterations = 0
        const countObservable = stream(count)
        const doubleCountObservable = stream(doubleCount)
        const merged = merge(countObservable, doubleCountObservable)
        merged({
            next: num => {
                expect(num).to.satisfy(function(num: number) {
                    return count.includes(num) || doubleCount.includes(num)
                })
                iterations++
            },
            complete: () => completed = true,
            error: () => error = true
        })
        expect(iterations).eq(count.length + doubleCount.length)
        expect(completed).eq(true)
        expect(error).eq(false)
    })

    it('multicast', function() {
        const observer1 = makeObserver(count)
        const observer2 = makeObserver(count)
        const observable = multicast(stream(count), observer1.observer, observer2.observer)
        let completed = false
        observable({
            complete: () => completed = true
        })
        expect(observer1.vars.completed).eq(observer2.vars.completed)
        expect(observer1.vars.error).eq(observer2.vars.error)
        expect(observer1.vars.iterations).eq(observer2.vars.iterations)
        expect(completed).eq(true)
    })

    it('switchmap', function() {
        let completed = false
        let errors = 0
        let iterations = 0
        const observable = switchMap(stream(count), stream(count))
        observable({
            next: () => iterations++,
            complete: () => completed = true,
            error: () => errors++
        })
        expect(iterations).eq(count.length ** 2)
        expect(errors).eq(0)
        expect(completed).eq(true)
    })

    it('zip', function() {
        let completed = false
        let error = false
        let iterations = 0
        const observable = zip(stream(count), stream(doubleCount))
        observable({
            next: arr => {
                expect(arr).to.be.an('array')
                iterations++
            },
            complete: () => completed = true,
            error: () => error = true
        })
        expect(completed).eq(true)
        expect(error).eq(false)
        expect(iterations).eq(count.length * 2)
    })
})