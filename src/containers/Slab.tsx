/** @jsxImportSource @emotion/react */

import React from "react"
import { one_border, useR$, FontSize, responsive_padding } from "../for-export"
import { useMyTheme } from "../hooks"
import { theme } from "../theme"

type SlabProps = {
    gap: FontSize
    bg: keyof typeof theme.colors
}

export const Slab = ({
    bg = "dark_5",
    padding = [["lg", "sm"], ["xl", "lg"], ["xl", "15%"], null, ["xl", "20%"]],
    children,
    gap = "lg",
    align = "flex-start" || [],
    img = null,
    ...props
}) => {
    const { colors, space } = useMyTheme()
    const pads = responsive_padding(space, padding)

    //console.log({ pads })
    return (
        <section
            css={useR$({
                boxSizing: "border-box",
                flexShrink: 0,
                width: "100%",
                height: "auto" /* 1068px */,
                display: "flex",
                flexDirection: ["column", null, "row"],
                justifyContent: "center",
                alignItems: align,
                padding: pads,
                backgroundColor: colors[bg],
                gap: space[gap],
                ...(img && {
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${img})`,
                    backgroundSize: "cover",
                }),
                //overflow: "visible",
            })}
        >
            {children}
        </section>
    )
}
