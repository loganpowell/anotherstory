//import React from "react"
import { TitledBullets } from "../components"
import { Slab, TextPanel } from "../containers"
import { H2 } from "../elements"

const data = {
    Connect: {
        //subtitle: "should you choose AnotherStory™",
        bullets: [
            {
                icon: "envelope",
                point: "Email",
                link: "mailto:inquiries@anotherstory.com?subject=Referral%20from%20anotherstory",
            },
            {
                icon: "facebook-logo",
                point: "facebook",
                link: "https://www.facebook.com/pg/anotherstorybham/",
            },
            {
                icon: "instagram-logo",
                point: "Instagram",
                link: "https://www.instagram.com/anotherstorybham/?hl=en",
            },
            {
                icon: "linkedin-logo",
                point: "LinkedIn",
                link: "https://www.linkedin.com/company/strout-architecture-and-construction",
            },
        ],
    },
    Location: {
        bullets: [{ point: "Homewood" }, { point: "Birmingham, AL" }, { point: "USA" }],
    },
}

const Location = () => {
    return (
        <TextPanel>
            <H2>Location</H2>
        </TextPanel>
    )
}
export const Footer = () => {
    return (
        <Slab>
            <TitledBullets bullets={data.Location.bullets} title="Location" />
            <TitledBullets bullets={data.Connect.bullets} title="Connect" />
        </Slab>
    )
}
