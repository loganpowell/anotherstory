import { useState, useEffect } from "react"
import { fromDOMEvent, trace, debounce, Stream } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
//import { bps, breakpoints } from "../theme"

// TODO: create CONSTS for EACH SIZE
export const default_sizes = ["xs", "sm", "md", "lg", "xl"]

interface IResize {
    target: {
        width: number
        height: number
    }
}

//@ts-ignore
const resize$: Stream<IResize> = fromDOMEvent(window.visualViewport, "resize")

export const size$ = resize$.transform({
    xform: map(e => ({ x: e.target.width, y: e.target.height })),
})

// Get the party started on load
resize$.next({
    target: { width: window.visualViewport.width, height: window.visualViewport.height },
})

// to be used in concert with theme/breakpoints.ts/make_responsive (userland)
export const generateBreakpoint$ = (bps, bp_sizes = default_sizes) =>
    size$.map(({ x, y }) => {
        //console.log({ x, y })
        switch (true) {
            case x < bps[0]:
                return bp_sizes[0]
            case x < bps[1]:
                return bp_sizes[1]
            case x < bps[2]:
                return bp_sizes[2]
            case x < bps[3]:
                return bp_sizes[3]
            default:
                return bp_sizes[4]
        }
    })

const breakpoint_settings_err = (bps, arr) => `
    Length of responsive parameters do not match breakpoints:
    
    NUMBER OF BREAKPOINTS = ${bps.length} ${bps.map((bp, i) => `\n${i}) ${bp}`)}
    
    NUMBER OF SETTINGS PROVIDED = ${arr.length} ${arr.map((bp, i) => `\n${i}) ${bp}`)}
    
    Making mobile-first assumptions about what you want to do...
    `

export const make_responsive = (settings, bp_sizes = default_sizes) => {
    //console.log({ settings })
    const n1 = bp_sizes.length
    const n2 = settings.length
    //if (n1 !== n2) {
    //    console.log(breakpoint_settings_err(bp_sizes, settings))
    //}
    return size => {
        const filled = [...settings, ...Array(n1 - n2)]
        const config = filled.reduce(function re(a, c, i, d) {
            // if c === null (use the last valid setting)
            return {
                ...a,
                [bp_sizes[i]]:
                    c ||
                    (i >= 1 && d[i - 1]) ||
                    (i >= 2 && d[i - 2]) ||
                    (i >= 3 && d[i - 3]) ||
                    (i >= 4 && d[i - 4]) ||
                    (i >= 0 && d[i + 1]) ||
                    (i >= 0 && d[i + 2]) ||
                    (i >= 0 && d[i + 3]),
            }
        }, {})

        //console.log(config)
        return config[size]
    }
}
