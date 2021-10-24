/** @jsxImportSource @emotion/react */

import React from "react"

import { useMyTheme } from "../hooks"

export const TextPanel = ({ children }) => {
    const { space, fontSizes } = useMyTheme()
    return (
        <div
            css={{
                width: ["100%", null, "1fr"],
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: space.md,
                paddingTop: space.md,
            }}
        >
            {children}
        </div>
    )
}
