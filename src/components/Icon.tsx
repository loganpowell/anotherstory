/** @jsxImportSource @emotion/react */
import React from "react"
import { useMyTheme } from "../hooks"

// set styles in index.css
export const Icon = ({ weight, type, color = "white", size = null }) => {
    const { colors, fontSizes } = useMyTheme()
    return (
        <span
            css={{
                color: color || colors.dark_5,
                fontSize: fontSizes[size] || fontSizes.md,
                lineHeight: 0,
            }}
        >
            <i className={"phosphor ph-" + type + (weight && "-" + weight)}></i>
        </span>
    )
}
