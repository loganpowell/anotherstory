import { size$, breakpoint$, CTX } from "../context"
export const bp_sizes = ["xs", "sm", "md", "lg", "xl"]

const breakpoint_settings_err = (bps, arr) => `
Length of responsive parameters do not match breakpoints:

NUMBER OF BREAKPOINTS = ${bps.length} ${bps.map((bp, i) => `\n${i}) ${bp}`)}

NUMBER OF SETTINGS PROVIDED = ${arr.length} ${arr.map((bp, i) => `\n${i}) ${bp}`)}

Making mobile-first assumptions about what you want to do...
`

export const make_responsive = settings => {
    //console.log({ settings })
    const n1 = bp_sizes.length
    const n2 = settings.length
    if (n1 !== n2) {
        console.log(breakpoint_settings_err(bp_sizes, settings))
    }
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
                    (i >= 5 && d[i - 5]) ||
                    (i >= 0 && d[i + 1]) ||
                    (i >= 0 && d[i + 2]) ||
                    (i >= 0 && d[i + 3]),
            }
        }, {})

        //console.log(config)
        return config[size]
    }
}
