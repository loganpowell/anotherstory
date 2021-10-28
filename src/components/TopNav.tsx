/** @jsxImportSource @emotion/react */

import { motion } from "framer-motion"
import React, { useCallback, useEffect, useState, useMemo, useRef } from "react"
import { Slab, slim_slab_padding } from "../containers"
import { H4 } from "../elements"
import { useMyTheme, useSize$, useThrottle } from "../hooks"
import throttle from "lodash.throttle"
import { Link } from "."

export const TopNav = () => {
    const size = useSize$()
    const [showing, setShowing] = useState(true)
    const [lastYPos, setLastYPos] = useState(0)

    const { colors, fontSizes, fontWeights } = useMyTheme()
    //const debouncedYPos = useDebounce(lastYPos, 1000)

    //console.log({ size })

    const setScroll = () => {
        const yPos = window.scrollY
        //console.log({ yPos })
        const isScrollingUp = yPos < 100 || yPos < lastYPos
        setShowing(isScrollingUp)
        setLastYPos(yPos)
    }
    const throttled = useThrottle(setScroll, 300)

    useEffect(() => {
        window.addEventListener("scroll", throttled, false)
        return () => window.removeEventListener("scroll", throttled, false)
    }, [throttled])

    return (
        <motion.div
            css={{
                height: "auto",
                width: "100%",
                position: "fixed",
                //top: 0,
                //left: 0,
                zIndex: 20,
            }}
            initial="show"
            variants={{
                show: {
                    y: 0,
                    transition: {
                        ease: "easeIn",
                    },
                },
                hide: {
                    y: -100,
                    transition: {
                        ease: "easeOut",
                    },
                },
            }}
            animate={(showing && "show") || "hide"}
        >
            {/*{((size === "sm" || size === "xs") && (*/}
            <Slab padding={slim_slab_padding} bg="none" blur direction={["row"]} align="center">
                <div
                    css={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <H4 color="light_5">AnotherStory</H4>
                </div>
                <div
                    css={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end", // TODO: "space-between"
                    }}
                >
                    <Link
                        href="/contact"
                        css={{
                            width: "auto",
                            height: "auto",
                            padding: "1.5rem 3rem",
                            backgroundColor: colors.light_5,
                            color: colors.dark_5,
                            borderRadius: "1rem",
                            fontWeight: fontWeights.bold,
                            fontSize: fontSizes.sm,
                        }}
                    >
                        Connect
                    </Link>
                </div>
            </Slab>
            ){/*) || <Slab padding={slim_slab_padding}> Large </Slab>}*/}
        </motion.div>
    )
}
