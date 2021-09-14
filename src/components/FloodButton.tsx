import React, { useEffect, useLayoutEffect, useState, useContext } from "react"
import styled from "@emotion/styled"
import { motion, AnimatePresence, useCycle } from "framer-motion"
import { theme, bps, make_responsive } from "../theme"
import { size$, breakpoint$, CTX } from "../context"
//import { MenuToggle } from "../elements"

interface IFlex {
    size?: string
    css?: any
}

const responsive_bg = make_responsive(["red", "grey", "green", "blue"])

const CircumscribedShadow = styled(motion.div)<IFlex>(({ size, css }) => ({
    position: "absolute",
    resize: "both",
    zIndex: 10,
    boxShadow: `0 0 0 200vmax ${responsive_bg(size) || theme.colors.muted}`,
    clipPath: "circle(72%)",
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
            initial="initial"
            animate="animate"
            onClick={() => trigger(true)}
        >
            {null}
            {/*<MenuToggle toggle={() => trigger(true)} right={0} />*/}
        </CircumscribedShadow>
    )
}

const list_variant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            //ease: "linear",
            //duration: 1,
            //delay: 1,
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.2,
            staggerDirection: -1,
        },
    },
}

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

const MenuFlood = ({ trigger, children, ...props }) => {
    const { size } = useContext(CTX)
    const { height, right, width } = getFloodDims()
    return (
        <CircumscribedShadow
            {...props}
            size={size}
            css={{
                width,
                height,
                top: 0,
                right,
            }}
            layoutId="flood"
            onClick={() => trigger(false)}
        >
            <AnimatePresence exitBeforeEnter>
                <motion.ul
                    variants={list_variant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        boxSizing: "border-box",
                        width: "aut0",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px",
                        //backgroundColor: "#ffffff",
                        overflow: "hidden",
                    }}
                >
                    {children}
                </motion.ul>
                {/*<MenuToggle toggle={trigger} right={right} />*/}
            </AnimatePresence>
        </CircumscribedShadow>
    )
}

const list_item_variant = i => ({
    initial: {
        top: -200,
    },
    animate: {
        top: i * 20 + 10,
    },
    exit: {
        top: -200,
    },
})

const Path = props => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="#000000"
        strokeLinecap="round"
        {...props}
    />
)

export const MenuToggle = ({ toggle, isOpen, ...props }) => {
    return (
        <motion.button
            onClick={toggle}
            style={{
                position: "absolute",
                width: "2rem",
                height: "2rem",
                top: "2rem",
                right: "2rem",
                //textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
            }}
            animate={isOpen ? "animate" : "initial"}
            {...props}
        >
            <svg width="23" height="18" viewBox="0 0 23 18">
                <Path
                    variants={{
                        initial: { d: "M 2 2.5 L 20 2.5" },
                        animate: { d: "M 3 16.5 L 17 2.5" },
                    }}
                />
                <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        initial: { opacity: 1 },
                        animate: { opacity: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                />
                <Path
                    variants={{
                        initial: { d: "M 2 16.346 L 20 16.346" },
                        animate: { d: "M 3 2.5 L 17 16.346" },
                    }}
                />
            </svg>
        </motion.button>
    )
}

const _items = items =>
    items.map((ch, i) => (
        <motion.li
            key={"cl-" + i}
            layoutId={"cl-" + i}
            variants={list_item_variant(i)} //
            exit="exit"
        >
            <a
                style={{
                    color: "white",
                }}
                href={ch.url}
            >
                {ch.title}
            </a>
        </motion.li>
    ))
export const FloodButton = ({ items, ...props }) => {
    const [menuOpen, setMenuOpen] = useCycle(false, true)

    return (
        <div style={{ position: "relative" }}>
            <MenuToggle toggle={setMenuOpen} isOpen={menuOpen} />
            <AnimatePresence exitBeforeEnter>
                {(menuOpen && <MenuFlood trigger={setMenuOpen}>{_items(items)}</MenuFlood>) || (
                    <MenuButton trigger={setMenuOpen}>{_items(items)}</MenuButton>
                )}
            </AnimatePresence>
        </div>
    )
}
