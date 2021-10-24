import React from "react"
import { Link, TopNav } from "../components"
import { medium_slab_padding, Page, Slab, slim_slab_padding } from "../containers"
import { WhatWhy, BannerQuote, IsoSimple, IsoLiving, BoldSlab, IsoStair, BigQuote } from "../slabs"
import { Footer } from "../slabs/Footer"
import { TimelineHome, WhenTitle } from "../slabs/TimelineHome"
export const Home = ({ data: { data } }) => {
    console.log({ data })
    return (
        <Page>
            <TopNav />
            <BannerQuote />
            <WhatWhy />
            <BoldSlab title="How" subtitle="it is done" />
            <IsoSimple
                src={process.env.PUBLIC_URL + "/svgs/about-us.svg"}
                tagline="We build your second story without breaching the first"
                zIndex={10}
            />
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
