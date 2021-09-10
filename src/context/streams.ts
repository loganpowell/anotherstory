import { fromDOMEvent, trace } from "@thi.ng/rstream"
import { map } from "@thi.ng/transducers"
const resize$ = fromDOMEvent(window, "resize")

export const size$ = resize$.transform({
    xform: map(e =>
        //@ts-ignore
        ({ x: e.target.innerWidth, y: e.target.innerHeight })
    ),
})

// Get the party started on load
resize$ //@ts-ignore
    .next({ target: { innerWidth: window.innerWidth, innerHeight: window.innerHeight } })

//size$.subscribe(trace("resize$:"))
