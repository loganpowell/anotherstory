import { API } from "@-0/browser"
import { H1, H2, H3 } from "../elements"
import { Link, TopNav } from "../components"
import {
    medium_slab_padding,
    Page,
    Slab,
    slim_slab_padding,
    xtall_slab_padding,
} from "../containers"
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
    YouTubeSlab,
} from "../slabs"

// need the extra "data" prop to nest home state inside global atom
export const Home = ({ data: { data } }) => {
    const {
        colors: { dark_5 },
        fonts,
        fontWeights,
        lineHeights,
        fontSizes: { xs, sm, md },
    } = useMyTheme()

    //console.log("Home:", { data })

    return (
        <Page>
            {/*<BannerQuote />*/}
            <Slab
                //padding={xtall_slab_padding}
                bg="light_5"
                justify="center"
                align={["flex-start", null, "center"]}
                full_height={true}
                direction={["column"]}
            >
                <H1>Double Your Square Footage</H1>
                <H3 color="dark_5" weight="thin">
                    The Easy Way
                </H3>
            </Slab>
            <YouTubeSlab embedId="736543055" yt={false} title="Hall Interview" />

            <WhatWhy />
            <BoldSlab title="How" subtitle="it is done" />
            <IsoSimple
                src="/svgs/about-us.svg"
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
                src="/svgs/living.svg"
                tagline="While you live uninterrupted and dust-free until stair installation"
                zIndex={1}
            />
            <IsoStair
                src="/svgs/stair.svg"
                tagline="Stairs are installed and cleanup occurs at the end of the process"
                zIndex={10}
            />
            <Slab aria-hidden bg="light_5" padding={medium_slab_padding}>
                {/*<Link href="#initial-phone-call"> Initial Phone Call </Link>*/}
                <span></span>
            </Slab>
            <TimelineHome title="When" subtitle="things happen for you" data={data} />

            <BannerQuote />
            <BigQuote />

            <Footer />
        </Page>
    )
}
