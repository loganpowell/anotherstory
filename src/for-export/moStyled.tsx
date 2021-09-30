import React, { useContext } from "react"
import { motion, MotionStyle } from "framer-motion"
import styled from "@emotion/styled"
import { isFunction, isArray } from "@thi.ng/checks"
import { make_responsive, default_tshirt_sizes } from "./responsive"
import { CTX } from "../context"

interface IFlex {
    size?: string
    style?: React.CSSProperties
}

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

export const styleConfig =
    (CTX: React.Context<{ size: string }>, theme: Record<string, unknown>) =>
    ({
        as = "div",
        style,
        label = "unknown",
        children,
        ...props
    }: {
        as?: keyof JSX.IntrinsicElements
        style: React.CSSProperties
        label?: string
        children?: React.ReactNode
    }) => {
        const { size } = useContext(CTX)
        const parseStyle = {}
        Object.entries(style).forEach(([k, v]) => {
            if (isArray(v)) {
                // function accepts size
                //console.log("isArray:", v)
                parseStyle[k] = make_responsive(v, default_tshirt_sizes, label)(size)
                return
            }
            if (isFunction(v)) {
                //console.log("isFunction:", v)
                parseStyle[k] = v(props, theme)
                return
            } else {
                //console.log("regular css:", v)
                parseStyle[k] = v
                return
            }
        })
        const El = styled(as)({
            ...parseStyle,
            label,
        })
        return <El {...props}>{children}</El>
    }

export const StyledAs = styleConfig(CTX, {
    font: "Fira Code",
    colors: { base: ["white", "black", "#F6F6EE"] },
})

export const ExampleUse = props => (
    <StyledAs
        {...props}
        as="div"
        style={{
            width: ["5rem", "10rem"],
            fontSize: ["2rem", "3rem"],
            backgroundColor: ({ color }) => color,
            fontFamily: (_, { font }) => font,
        }}
        color="blue"
    >
        ExampleUse
    </StyledAs>
)
