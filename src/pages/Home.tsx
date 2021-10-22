import React from "react"
import { Page, Slab } from "../containers"
import { WhatWhy, BannerQuote, IsoPrompt, MIsoPrompt } from "../slabs"
export const Home = ({ data }) => {
    return (
        <Page>
            <BannerQuote />
            <WhatWhy />

            <IsoPrompt
                src={process.env.PUBLIC_URL + "/svgs/about-us.svg"}
                tagline="We build your second story without breaching the first"
                zIndex={10}
            />
            <MIsoPrompt
                src={process.env.PUBLIC_URL + "/svgs/living.svg"}
                tagline="While you live uninterrupted and dust-free until stair installation"
                zIndex={1}
            />
        </Page>
    )
}
