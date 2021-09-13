import React, { useEffect, useLayoutEffect, useState, useContext } from "react"
import styled from "@emotion/styled"
import { motion, AnimatePresence } from "framer-motion"
import { theme, bps, make_responsive } from "../theme"
import { size$, breakpoint$, CTX } from "../context"

interface CSP {
    size?: string
    css?: any
}

const responsive_bg = make_responsive(["red", "yellow", "green", "blue"])

const CircumscribedShadow = styled(motion.div)<CSP>(({ size, css }) => ({
    position: "absolute",
    resize: "both",
    zIndex: 10,
    boxShadow: `0 0 0 200vmax ${responsive_bg(size) || theme.colors.muted}`,
    clipPath: "circle(71%)",
    cursor: "pointer",
    backgroundColor: responsive_bg(size) || theme.colors.muted,
    ...css,
}))

const MenuButton = ({ trigger, ...props }) => {
    const { size } = useContext(CTX)

    return (
        <CircumscribedShadow
            {...props}
            size={size}
            css={{
                width: "2rem",
                height: "2rem",
                top: "2rem",
                right: "2rem",
            }}
            layoutId="flood"
            onClick={() => trigger(true)}
        >
            <motion.div
                initial="hidden"
                animate={{ opacity: 1 }}
                transition={{
                    delay: 2,
                }}
            >
                ==
            </motion.div>
        </CircumscribedShadow>
    )
}

const list_variant = {
    initial: {},
    animate: {},
    exit: {},
}
const MenuFlood = ({ trigger, children, ...props }) => {
    const { size } = useContext(CTX)
    const x = window.innerWidth
    const y = window.innerHeight

    const dim = x > y ? x : y

    return (
        <CircumscribedShadow
            {...props}
            size={size}
            css={{
                width: dim,
                height: dim,
                top: 0,
                right: 0,
            }}
            layoutId="flood"
            onClick={() => trigger(false)}
        >
            <AnimatePresence>
                <motion.ul
                    style={{
                        boxSizing: "border-box",
                        width: "auto /* 216px */",
                        height: "auto /* 122px */",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#ffffff",
                        overflow: "hidden",
                    }}
                >
                    {children}
                </motion.ul>
            </AnimatePresence>
        </CircumscribedShadow>
    )
}
export const FloodButton = ({ items, ...props }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div style={{ position: "relative" }}>
            <AnimatePresence exitBeforeEnter>
                {(menuOpen && (
                    <MenuFlood trigger={setMenuOpen}>
                        {items.map((ch, i) => (
                            <motion.li key={"cl-" + i}>
                                <a href={ch.url}>{ch.title}</a>
                            </motion.li>
                        ))}
                    </MenuFlood>
                )) || <MenuButton trigger={setMenuOpen} />}
            </AnimatePresence>
        </div>
    )
}
