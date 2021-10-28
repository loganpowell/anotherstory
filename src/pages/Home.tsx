/** @jsxImportSource @emotion/react */

import React from "react"
import { Link, TopNav } from "../components"
import { medium_slab_padding, Page, Slab, slim_slab_padding } from "../containers"
import { useR$ } from "../for-export"
import { useMyTheme } from "../hooks"
import {
    WhatWhy,
    BannerQuote,
    IsoSimple,
    IsoLiving,
    BoldSlab,
    IsoStair,
    BigQuote,
    TimelineHome,
    WhenTitle,
    Footer,
} from "../slabs"
export const Home = ({ data: { data } }) => {
    const {
        colors: { dark_5 },
        fonts,
        fontWeights,
        lineHeights,
        fontSizes: { xs, sm, md },
    } = useMyTheme()

    console.log({ data })
    return (
        <Page>
            <BannerQuote />
            <WhatWhy />
            <BoldSlab title="How" subtitle="it is done" />
            <IsoSimple
                src={process.env.PUBLIC_URL + "/svgs/about-us.svg"}
                alt="We build your second story without breaching the first"
                zIndex={10}
            >
                <p
                    css={useR$({
                        flex: "1",
                        color: dark_5,
                        fontFamily: fonts.serif,
                        fontWeight: fontWeights.normal,
                        lineHeight: lineHeights.md,
                        fontSize: [sm, null, md],
                    })}
                >
                    We build your second story without breaching the first
                </p>
            </IsoSimple>
            <IsoLiving
                src={process.env.PUBLIC_URL + "/svgs/living.svg"}
                tagline="While you live uninterrupted and dust-free until stair installation"
                zIndex={1}
            />
            <IsoStair
                src={process.env.PUBLIC_URL + "/svgs/stair.svg"}
                tagline="Stairs are installed and cleanup occurs at the end of the process"
                zIndex={10}
            />
            <Slab aria-hidden bg="light_5" padding={medium_slab_padding}>
                {/*<Link href="#initial-phone-call"> Initial Phone Call </Link>*/}
                <span></span>
            </Slab>
            <TimelineHome title="When" subtitle="things happen for you" data={data} />

            <BigQuote />
            <Footer />
        </Page>
    )
}
