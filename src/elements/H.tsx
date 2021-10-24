/** @jsxImportSource @emotion/react */

import React, { useContext } from "react"
import { Slab } from "../containers"
import { IconBullet, BulletList } from "../components"
import { useR$ } from "../for-export"
import { useMyTheme, useSize$ } from "../hooks"
import { CTX } from "../context"

export const H2 = ({ color = "light_5", children }) => {
    const {
        fontSizes: { xxl, xl, lg, md },
        letterSpacings: { xxs, xs },
        fontWeights: { black },
        colors,
    } = useMyTheme()

    return (
        <h2
            css={useR$({
                color: colors[color],
                fontWeight: black,
                letterSpacing: [xs, null, xxs],
                fontSize: [lg, null, xl],
                lineHeight: 0.5,
            })}
        >
            {children}
        </h2>
    )
}

export const H4 = ({ color = "light_5", children }) => {
    const {
        colors,
        fontSizes: { xxl, xl, lg, md, sm },
    } = useMyTheme()
    return (
        <h4
            css={useR$({
                color: colors[color],
                fontSize: [sm, md],
            })}
        >
            {children}
        </h4>
    )
}
