import { fromDOMEvent, trace, debounce } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
import { bps, breakpoints, bp_sizes } from "../theme"

const resize$ = fromDOMEvent(window.visualViewport, "resize")

export const size$ = resize$.transform({
    xform: map(e =>
        //@ts-ignore
        ({ x: e.target.width, y: e.target.height })
    ),
})

// Get the party started on load
resize$ //@ts-ignore
    .next({ target: { width: window.visualViewport.width, width: window.visualViewport.height } })

export const breakpoint$ = size$.map(({ x, y }) => {
    console.log({ x, y })
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

//breakpoint$.subscribe(trace("breakpoint$:"))
