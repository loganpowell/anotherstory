import React, { useEffect, useLayoutEffect, useState, useContext, useCallback } from "react"
import styled, { StyledTags } from "@emotion/styled"
import { motion, AnimatePresence, useCycle, useViewportScroll, usePresence } from "framer-motion"
import { theme } from "../theme"
import { make_responsive } from "../for-export"
import { CTX } from "../context"
import { micons } from "../elements"
import { Card } from "./Cards"
import { StyledAs } from "../for-export"
import * as CSS from "csstype"

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

interface IFlex {
    size?: string
    styledWith?: CSS.Properties
}

const CenterButton = moStyled("button")(
    //@ts-ignore
    ({ size, styledWith }: { size: string; styledWith: CSS.Properties }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        cursor: "pointer",
        ...styledWith,
    })
)

export const MenuIcon = ({ toggle, isOpen, ...props }) => {
    return (
        <CenterButton
            onClick={() => toggle(!isOpen)}
            animate={isOpen ? "open" : "closed"}
            styledWith={{
                position: "fixed",
                top: "3rem",
                right: "3rem",
                width: "3rem",
                height: "3rem",
            }}
            {...props}
        >
            <micons.OpenClosed open="open" closed="closed" />
        </CenterButton>
    )
}

const Circumscribed = moStyled("div")<IFlex>(({ size, styledWith }) => ({
    position: "fixed",
    resize: "both",
    zIndex: 10,
    boxShadow: `0 0 0 200vmax ${responsive_bg(size) || theme.colors.muted}`,
    clipPath: "circle(72%)",
    cursor: "pointer",
    backgroundColor: responsive_bg(size) || theme.colors.muted,
    label: "circumscribed",
    ...styledWith,
}))

const MenuClosed = ({ trigger, ...props }) => {
    const { size } = useContext(CTX)

    return (
        <Circumscribed
            //key="closed"
            size={size}
            styledWith={{
                width: "3rem",
                height: "3rem",
                top: "3rem",
                right: "3rem",
            }}
            layoutId="flood"
            onClick={() => trigger(true)}
            {...props}
        >
            {null}
        </Circumscribed>
    )
}

// TODO: export to @-0/browser/utils
const getFloodDims = () => {
    const x = window.visualViewport.width
    const y = window.visualViewport.height

    const dim = x > y ? x : y
    const right = x > y ? 0 : (x - y) / 2

    return {
        width: dim,
        height: dim,
        right,
        x,
        y,
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

const MenuOpen = ({ trigger, children, ...props }) => {
    const { size } = useContext(CTX)
    const { scrollY } = useViewportScroll()
    const closeMe = useCallback(e => trigger(false), [trigger])
    useEffect(() => {
        //console.log({ scrollY })
        document.addEventListener("scroll", closeMe)
        return () => document.removeEventListener("scroll", closeMe)
    }, [scrollY, trigger, closeMe])

    const { height, right, width } = getFloodDims()
    return (
        <Circumscribed
            {...props}
            //key="open"
            size={size}
            styledWith={{
                width,
                height,
                top: 0,
                right,
                overflow: "hidden",
            }}
            layoutId="flood"
            // 🧐 used for child orchestration only
            variants={{
                open: {
                    transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                        //when: "beforeChildren",
                    },
                },
                closed: {
                    transition: {
                        staggerChildren: 0.1,
                        staggerDirection: -1,
                        //when: "afterChildren",
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
    const { x } = getFloodDims()

    //console.log({ x })
    return (
        <motion.li
            //adding layout prop screws up 1st mount animation 🤷
            //layout // <- 🔥
            variants={{
                open: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        ...ease,
                    },
                },
                closed: {
                    x,
                    opacity: 0,
                    transition: {
                        ...ease,
                    },
                },
            }}
            {...props}
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
                //onExitComplete={() => {
                //    console.log(
                //        "AnimatedPresence:",
                //        menuOpen ? "MenuClosed" : "MenuOpen",
                //        "unmounted!"
                //    )
                //}}
                // enable exit transitions to happen before unmount/remount
                exitBeforeEnter
            >
                {(menuOpen && (
                    <MenuOpen trigger={setMenuOpen} key="open">
                        {_items(items)}
                    </MenuOpen>
                )) || <MenuClosed trigger={setMenuOpen}>{_items(items)}</MenuClosed>}
            </AnimatePresence>
        </div>
    )
}
