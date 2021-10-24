/** @jsxImportSource @emotion/react */

import React from "react"
import { Slab, xtall_slab_padding } from "../containers"
import { Avatar, AvatarQuote } from "../elements"
import { useMyTheme } from "../hooks"
import { lineHeights } from "../theme"

const long_quote =
    "Some say the world will end in fire. Some say in ice. From what I've witnessed of desire, I hold with those that favor fire. But if it had to perish twice, I think I know enough of hate - to say that for destruction, ice, is also great and would suffice."

const short_quote = "Once upon a midnight, dreary. While I pondered, weak and weary..."
export const BannerQuote = ({
    quote = long_quote,
    name = "Bill Murray",
    location = "Birmingham, AL",
    size = "sm",
    src = "https://www.fillmurray.com/360/360",
    shape = "circle",
    align = "left",
    topline = "The Buies",
    banner_img = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
}) => {
    const { fontWeights, fontSizes, letterSpacings, colors } = useMyTheme()
    const position = {
        position: "relative",
        top: 0,
        left: 0,
    }
    return (
        <Slab
            bg={"none"}
            align={["flex-start", null, "flex-end"]}
            img={banner_img}
            //padding={xtall_slab_padding}
            full_height={true}
        >
            <h3
                css={{
                    fontFamily: "Poppins",
                    fontSize: fontSizes.xl,
                    fontWeight: fontWeights.black,
                    letterSpacing: letterSpacings.sm,
                    //color: colors.light_3,
                    lineHeight: lineHeights.sm,
                    marginTop: "10rem",
                    flex: 1,
                    width: 1,
                    WebkitTextStroke: "1px",
                    WebkitTextStrokeColor: colors.light_3,
                    WebkitTextFillColor: "transparent",
                }}
            >
                {topline}
            </h3>
            <AvatarQuote
                text={quote}
                name={name}
                location={location}
                size={size}
                src={src}
                align={align}
                shape={shape}
            />
        </Slab>
    )
}
