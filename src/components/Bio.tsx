/** @jsxImportSource @emotion/react */

import React from "react"
import { Avatar } from "../elements"
import { useMyTheme } from "../hooks"

export const Bio = ({ title, full_name, bio, img, color = "dark_5" }) => {
    const { colors, fontSizes, fonts, fontWeights, space } = useMyTheme()
    return (
        <div
            css={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflow: "hidden",
                gap: space.sm,
            }}
        >
            <div
                css={{
                    width: "auto" /* 125px */,
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflow: "visible",
                }}
            >
                <Avatar size="md" src={img} />
            </div>
            <div
                css={{
                    flex: 1,
                    width: 1,
                    flexShrink: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    overflow: "hidden",
                    gap: space.xs,
                }}
            >
                <p
                    css={{
                        height: "auto" /* 14px */,
                        flexShrink: 0,
                        width: "100%",
                        fontFamily: fonts.mono,
                        color: colors[color],
                        fontSize: fontSizes.sm,
                        letterSpacing: 0,
                    }}
                >
                    {title}
                </p>
                <p
                    css={{
                        height: "auto" /* 14px */,
                        flexShrink: 0,
                        width: "100%",
                        color: colors[color],
                        fontSize: fontSizes.sm,
                        fontWeight: fontWeights.black,
                        letterSpacing: 0,
                        //  lineHeight: 1.2,
                    }}
                >
                    {full_name}
                </p>
                <p
                    css={{
                        height: "auto" /* 14px */,
                        flexShrink: 0,
                        width: "100%",
                        fontFamily: fonts.serif,
                        color: colors[color],
                        fontSize: fontSizes.sm,
                        //  lineHeight: 1.2,
                    }}
                >
                    {bio}
                </p>
            </div>
        </div>
    )
}
