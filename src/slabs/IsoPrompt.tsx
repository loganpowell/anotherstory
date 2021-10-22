/** @jsxImportSource @emotion/react */

import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { motion } from "framer-motion"
import { Slab } from "../containers"
import { useInView } from "react-intersection-observer"
import { useMyTheme, useBbox } from "../hooks"
import { CTX } from "../context"

export const BoldSlab = ({ ...props }) => {
    return (
        <Slab bg="light_5">
            <div>
                <h3>
                    <span
                        css={
                            {
                                //fontSize:
                            }
                        }
                    >
                        How
                    </span>{" "}
                    it&aposs done
                </h3>
            </div>
        </Slab>
    )
}
export const MIsoPrompt = ({ src, tagline, zIndex = 1 }) => {
    const { ref, inView, entry } = useInView({
        threshold: 0.5,
    })
    const [rect, setRect] = useState(null)

    useEffect(() => {
        setRect(entry?.target?.getBoundingClientRect())
    }, [entry])
    const { height } = rect || { height: 100 }
    //const { size$ } = useContext(CTX)

    console.log({ inView, entry, rect })

    const {
        colors: { dark_5 },
    } = useMyTheme()
    return (
        <Slab
            myRef={ref}
            align="center"
            bg="light_5"
            padding={[["sm", "sm"], ["sm", "lg"], ["sm", "15%"], null, ["sm", "20%"]]}
            direction={["row"]}
        >
            <motion.img
                src={src}
                alt={tagline}
                css={{
                    width: "48%",
                    "&:after": {
                        content: `""`,
                        display: "block",
                        paddingBottom: "100%",
                    },
                    zIndex: zIndex,
                }}
                initial="out"
                animate={inView ? "in" : "out"}
                variants={{
                    out: {
                        y: -height / 1.7,
                    },
                    in: {
                        y: 0,
                        transition: {
                            delay: 0.5,
                            ease: "easeInOut",
                            //delayChildren: 0.5,
                        },
                    },
                }}
            />
            <p
                css={{
                    flex: "1",
                    width: "1",
                }}
            >
                {tagline}
            </p>
        </Slab>
    )
}
export const IsoPrompt = ({ src, tagline, zIndex = 1 }) => {
    const {
        colors: { dark_5 },
    } = useMyTheme()
    return (
        <Slab
            align="center"
            bg="light_5"
            padding={[["sm", "sm"], ["sm", "lg"], ["sm", "15%"], null, ["sm", "20%"]]}
            direction={["row"]}
        >
            <img
                src={src}
                alt={tagline}
                css={{
                    width: "48%",
                    "&:after": {
                        content: `""`,
                        display: "block",
                        paddingBottom: "100%",
                    },
                    zIndex: zIndex,
                }}
            />
            <p
                css={{
                    flex: "1",
                    width: "1",
                }}
            >
                {tagline}
            </p>
        </Slab>
    )
}
