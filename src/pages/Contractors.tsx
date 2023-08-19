import { API } from "@-0/browser"
import { Link, TopNav } from "../components"
import {
    medium_slab_padding,
    Page,
    Slab,
    slim_slab_padding,
    tall_slab_padding,
    TextPanel,
} from "../containers"
import { H2, H4, H3 } from "../elements"
import { IsoSimple, ContractorForm, Footer } from "../slabs/index"
import { useMyTheme } from "../hooks"

export const Contractors = ({ data }) => {
    const { fontWeights, fonts, letterSpacings, fontSizes, colors } = useMyTheme()

    //console.log({ data })
    return (
        <Page>
            <Slab padding={tall_slab_padding} bg="light_5" />
            <IsoSimple
                src="/svgs/about-us.svg"
                alt="contractor measuring stud in 2nd story addition"
            >
                <TextPanel>
                    <H3 font="serif" color="dark_5">
                        Let&apos;s talk shop
                    </H3>
                    <p
                        css={{
                            fontFamily: fonts.serif,
                            fontWeight: fontWeights.bold,
                            fontSize: fontSizes.sm,
                            color: colors.dark_5,
                        }}
                    >
                        We can make your next second story addition a breeze
                    </p>
                    <p
                        css={{
                            fontFamily: fonts.serif,
                            fontWeight: fontWeights.normal,
                            fontSize: fontSizes.sm,
                            color: colors.dark_5,
                        }}
                    >
                        Reach out with interest in joining our network
                    </p>
                </TextPanel>
            </IsoSimple>
            <ContractorForm />
            <Footer />
        </Page>
    )
}
