import React, { useEffect, useLayoutEffect, useState, useContext, useCallback } from "react"
import styled, { StyledTags } from "@emotion/styled"
import { motion, AnimatePresence, useCycle, useViewportScroll } from "framer-motion"
import { theme, bps } from "../theme"
import { make_responsive } from "../for-export"
import { CTX } from "../context"
import { MenuIcon } from "../elements"
import { Card } from "./Cards"

interface IFlex {
    size?: string
    styledWith?: React.CSSProperties
}

const responsive_bg = make_responsive(["red", "grey", "green", "blue"])

export const moStyled = (element: keyof JSX.IntrinsicElements) => styled(motion[element])

const Circumscribed = styled(motion.div)<IFlex>(({ size, styledWith }) => ({
    position: "fixed",
    resize: "both",
    zIndex: 10,
    boxShadow: `0 0 0 200vmax ${responsive_bg(size) || theme.colors.muted}`,
    clipPath: "circle(72%)",
    cursor: "pointer",
    backgroundColor: responsive_bg(size) || theme.colors.muted,
    ...styledWith,
}))

const MenuClosed = ({ trigger, ...props }) => {
    const { size } = useContext(CTX)

    return (
        <Circumscribed
            {...props}
            size={size}
            styledWith={{
                width: "2rem",
                height: "2rem",
                top: "2rem",
                right: "2rem",
            }}
            layoutId="flood"
            onClick={() => trigger(true)}
        >
            {null}
        </Circumscribed>
    )
}

// TODO: export
const getFloodDims = () => {
    const x = window.visualViewport.width
    const y = window.visualViewport.height

    const dim = x > y ? x : y
    const right = x > y ? 0 : (x - y) / 2

    return {
        width: dim,
        height: dim,
        right,
    }
}

const MenuItems = styled(motion.ul)({
    boxSizing: "border-box",
    width: "auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "left",
    padding: "8px",
    overflow: "hidden",
})

const MenuOpen = ({ trigger, children, ...props }) => {
    const { scrollY } = useViewportScroll()
    const closeMe = useCallback(e => trigger(false), [trigger])
    useEffect(() => {
        //console.log({ scrollY })
        document.addEventListener("scroll", closeMe)
        return () => document.removeEventListener("scroll", closeMe)
    }, [scrollY, trigger, closeMe])

    const { size } = useContext(CTX)
    const { height, right, width } = getFloodDims()
    return (
        <Circumscribed
            {...props}
            key="open"
            size={size}
            styledWith={{
                width,
                height,
                top: 0,
                right,
                overflow: "hidden",
            }}
            layoutId="flood"
            variants={{
                open: {
                    opacity: 1,
                    transition: {
                        delayChildren: 0.1,
                        staggerChildren: 0.1,
                    },
                },
                closed: {
                    opacity: 0,
                    transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                        //staggerDirection: -1,
                        when: "afterChildren",
                    },
                },
            }}
            initial="closed"
            animate="open"
            onClick={() => trigger(false)}
        >
            <MenuItems>{children}</MenuItems>
        </Circumscribed>
    )
}

const _items = items =>
    items.map((ch, i) => (
        <motion.li
            key={"cl-" + i}
            variants={{
                open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        damping: 100,
                        mass: 2,
                        stiffness: 1000,
                    },
                    z: 100,
                },
                closed: {
                    y: -5000,
                    opacity: 0,
                    z: 0,
                },
            }}
            exit={{
                scale: 0,
            }}
        >
            <Card
                img={process.env.PUBLIC_URL + "/images/peach.jpg"}
                href={ch.url}
                title={ch.title}
            />
        </motion.li>
    ))

export const FloodButton = ({ items, ...props }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div style={{ position: "relative" }}>
            <MenuIcon toggle={setMenuOpen} isOpen={menuOpen} />
            <AnimatePresence>
                {(menuOpen && <MenuOpen trigger={setMenuOpen}>{_items(items)}</MenuOpen>) || (
                    <MenuClosed trigger={setMenuOpen}>{_items(items)}</MenuClosed>
                )}
            </AnimatePresence>
        </div>
    )
}
