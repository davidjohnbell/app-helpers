import { describe, it } from 'mocha'
import { expect } from 'chai'
import { middleware, Middleware } from '../../src/utils/middleware'


describe('middleware', function() {
    it('should finish async', function(done) {
        try {
            const delay = 10
            const f1: Middleware<Record<string, boolean>> = (context, next) => {
                setTimeout(() => {
                    context.f1 = true
                    next()
                }, delay)
            }
            const f2: Middleware<Record<string, boolean>> = (context, next) => {
                setTimeout(() => {
                    expect(context.f1).eq(true)
                    context.f2 = true
                    next()
                }, delay)
            }
            const context: Record<string, boolean> = {}
            const stack = middleware(f1, f2)
            expect(context.f1).to.be.undefined
            expect(context.f2).to.be.undefined
            stack(context)
            setTimeout(() => {
                expect(context.f1).eq(true)
                expect(context.f2).eq(true)
                done()
            }, delay * 3)
        }
        catch(error) {
            done(error)
        }
    })

    it('should finish sync', function() {
        const f1: Middleware<Record<string, boolean>> = (context, next) => {
            context.f1 = true
            next()
        }
        const f2: Middleware<Record<string, boolean>> = (context, next) => {
            expect(context.f1).eq(true)
            context.f2 = true
            next()
        }
        const context: Record<string, boolean> = {}
        const stack = middleware(f1, f2)
        expect(context.f1).to.be.undefined
        expect(context.f2).to.be.undefined
        stack(context)
        expect(context.f1).eq(true)
        expect(context.f2).eq(true)
    })
})