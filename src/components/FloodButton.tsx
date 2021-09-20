import React, { useEffect, useLayoutEffect, useState, useContext, useCallback } from "react"
import styled, { StyledTags } from "@emotion/styled"
import { motion, AnimatePresence, useCycle, useViewportScroll, usePresence } from "framer-motion"
import { theme, bps } from "../theme"
import { make_responsive } from "../for-export"
import { CTX } from "../context"
import { MenuIcon } from "../elements"
import { Card } from "./Cards"

interface IFlex {
    size?: string
    styledWith?: React.CSSProperties
}

const responsive_bg = make_responsive(["red", "grey", "green", "darkgrey"])

//
//                                                 d8    d8b
//   e88~~8e  Y88b  /  888-~88e   e88~-_  888-~\ _d88__ !Y88!
//  d888  88b  Y88b/   888  888b d888   i 888     888    Y8Y
//  8888__888   Y88b   888  8888 8888   | 888     888     8
//  Y888    ,   /Y88b  888  888P Y888   ' 888     888     e
//   "88___/   /  Y88b 888-_88"   "88_-~  888     "88_/  "8"
//                     888
//

export const moStyled = (element: keyof JSX.IntrinsicElements) => styled(motion[element])

const Circumscribed = moStyled("div")<IFlex>(({ size, styledWith }) => ({
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

const ease = {
    //type: "spring",
    //damping: 100,
    //mass: 2,
    //stiffness: 1000,
    type: "ease",
    ease: [0.6, 0.01, -0.05, 0.95],
}
const MoList = ({ children, ...props }) => {
    return <motion.ul {...props}>{children}</motion.ul>
}
const MenuItems = styled(MoList)({
    boxSizing: "border-box",
    width: "auto",
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    padding: "90px 5%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
})

const MenuOpen = ({ trigger, isOpen, children, ...props }) => {
    const { size } = useContext(CTX)
    const { scrollY } = useViewportScroll()
    const closeMe = useCallback(e => trigger(false), [trigger])
    useEffect(() => {
        //console.log({ scrollY })
        document.addEventListener("scroll", closeMe)
        return () => document.removeEventListener("scroll", closeMe)
    }, [scrollY, trigger, closeMe])

    //console.log("MenuOpen'd:", { isOpen })
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
                    //opacity: 1,
                    transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.2,
                    },
                },
                closed: {
                    //opacity: 0,
                    transition: {
                        delay: 0.2,
                        ...ease,
                        staggerChildren: 0.2,
                        when: "afterChildren",
                    },
                },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => trigger(false)}
        >
            <MenuItems>{children}</MenuItems>
        </Circumscribed>
    )
}

const MoCard = ({ ch, ...props }) => {
    const { height, right, width } = getFloodDims()

    console.log({ height, right, width })
    return (
        <motion.li
            {...props}
            layout
            //layoutId={"li" + ch.title}
            variants={{
                open: {
                    x: 0,
                    //z: 100,
                },
                closed: {
                    x: width,
                    transition: {
                        ...ease,
                    },
                },
            }}
        >
            <Card
                img={process.env.PUBLIC_URL + "/images/peach.jpg"}
                href={ch.url}
                title={ch.title}
            />
        </motion.li>
    )
}
const _items = items => items.map((ch, i) => <MoCard key={"cl-" + i} ch={ch} i={i} />)

export const FloodButton = ({ items, ...props }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div style={{ position: "relative" }}>
            <MenuIcon toggle={setMenuOpen} isOpen={menuOpen} />
            <AnimatePresence
                onExitComplete={() => {
                    console.log("I'm out!")
                }}
                exitBeforeEnter
            >
                {(menuOpen && (
                    <MenuOpen isOpen={menuOpen} trigger={setMenuOpen} key="open">
                        {_items(items)}
                    </MenuOpen>
                )) || <MenuClosed trigger={setMenuOpen}>{_items(items)}</MenuClosed>}
            </AnimatePresence>
        </div>
    )
}
