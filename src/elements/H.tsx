/** @jsxImportSource @emotion/react */

import React, { useContext } from "react"
import { Slab } from "../containers"
import { IconBullet, BulletList } from "../components"
import { useR$ } from "../for-export"
import { useMyTheme, useSize$ } from "../hooks"
import { CTX } from "../context"

export const H2 = ({ color = "light_5", font = "sans", children }) => {
    const {
        fontSizes: { xxl, xl, lg, md },
        letterSpacings: { xxs, xs },
        fontWeights: { black },
        colors,
        fonts,
    } = useMyTheme()

    return (
        <h2
            css={useR$({
                color: colors[color],
                fontWeight: black,
                letterSpacing: [xs, null, xxs],
                fontSize: [lg, null, xl],
                lineHeight: 0.5,
                fontFamily: fonts[font],
            })}
        >
            {children}
        </h2>
    )
}

export const H3 = ({ color = "light_5", font = "sans", children }) => {
    const {
        colors,
        fontSizes: { lg, md },
        letterSpacings: { xs, sm },

        fonts,
    } = useMyTheme()
    return (
        <h3
            css={useR$({
                color: colors[color],
                fontSize: [md, null, lg],
                letterSpacing: sm,
                lineHeight: 1,
                fontFamily: fonts[font],
            })}
        >
            {children}
        </h3>
    )
}
export const H4 = ({ color = "light_5", font = "sans", children }) => {
    const {
        colors,
        fontSizes: { xxl, xl, lg, md, sm },
        letterSpacings: { xxs, xs, sm: lsm },

        fonts,
    } = useMyTheme()
    return (
        <h4
            css={useR$({
                color: colors[color],
                fontSize: [sm, null, md],
                letterSpacing: lsm,
                lineHeight: 1,
                fontFamily: fonts[font],
            })}
        >
            {children}
        </h4>
    )
}
