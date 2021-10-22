/** @jsxImportSource @emotion/react */

import React, { useContext } from "react"
import { Slab } from "../containers"
import { IconBullet, BulletList } from "../components"
import { useR$ } from "../for-export"
import { useMyTheme, useSize$ } from "../hooks"
import { fontSizes } from "../theme"
import { CTX } from "../context"

const data = {
    What: {
        subtitle: "are the benefits of adding a story?",
        bullets: [
            { icon: "image", point: "Retain open space" },
            { icon: "house", point: "Improve curb appeal" },
            { icon: "currency-dollar", point: "Larger home @ lower tax base" },
            { icon: "sun", point: "More natural light" },
            { icon: "wind", point: "Increased energy efficiency" },
            { icon: "trend-up", point: "Increased value" },
        ],
    },
    Why: {
        subtitle: "should you choose AnotherStory™",
        bullets: [
            { icon: "package", point: "No moving required" },
            { icon: "currency-dollar", point: "No short term renting" },
            { icon: "map-pin", point: "No disruption to commutes" },
            { icon: "face-mask", point: "Dustless renovation*" },
            { icon: "eye", point: "Privacy protected" },
            { icon: "smiley-nervous", point: "Less risk to possessions" },
        ],
    },
}

const H2 = ({ title }) => {
    const {
        fontSizes: { xxl, xl, lg, md },
        letterSpacings: { xxs, xs },
        fontWeights: { black },
        colors: { light_1, light_5 },
    } = useMyTheme()

    return (
        <h2
            css={useR$({
                color: light_1,
                fontWeight: black,
                letterSpacing: [xs, null, xxs],
                fontSize: [lg, null, xl],
                lineHeight: 0.5,
            })}
        >
            {title}
        </h2>
    )
}

const Subtitle = ({ subtitle }) => {
    const {
        colors,
        fontSizes: { xxl, xl, lg, md, sm },
    } = useMyTheme()
    return (
        <h4
            css={useR$({
                color: colors.light_5,
                fontSize: [sm, md],
            })}
        >
            {subtitle}
        </h4>
    )
}

const Prompt = ({ title, subtitle, bullets }) => {
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
            }}
        >
            <H2 title={title} />
            <Subtitle subtitle={subtitle} />
            <BulletList bullets={bullets} size="sm" />
        </div>
    )
}

export const WhatWhy = () => {
    return (
        <Slab bg="dark_5" gap="lg">
            <Prompt title="What" subtitle={data.What.subtitle} bullets={data.What.bullets} />
            <Prompt title="Why" subtitle={data.Why.subtitle} bullets={data.Why.bullets} />
        </Slab>
    )
}
