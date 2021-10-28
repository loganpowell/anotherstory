/** @jsxImportSource @emotion/react */
import React from "react"
import { nudge_size, useR$ } from "../for-export"
import { useMyTheme } from "../hooks"

// set styles in index.css
export const Icon = ({ weight, type, color = "white", size = "md" }) => {
    const { colors, fontSizes } = useMyTheme()
    const [downsize] = nudge_size(fontSizes)(size, -1)
    return (
        <span
            css={useR$({
                color: color || colors.dark_5,
                fontSize: [fontSizes[downsize], fontSizes[size]],
                lineHeight: 0,
            })}
        >
            <i className={"phosphor ph-" + type + (weight && "-" + weight)}></i>
        </span>
    )
}
