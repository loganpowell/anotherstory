import React, { useContext, useRef } from "react"
import { motion, MotionStyle, MotionProps } from "framer-motion"
import styled, { CreateStyled } from "@emotion/styled"
import { isFunction, isArray } from "@thi.ng/checks"
import { make_responsive, default_tshirt_sizes } from "./responsive"
import { IMoStyledProps, IStyledProps, IDynamicProps, Styles } from "./api"
import { CTX } from "../context"

const configResponsiveStyler = (CTX: React.Context<{ size$: string }>) => (css: Styles) => {
    const { size$ } = useContext(CTX)
    const parsed = {}
    Object.entries(css).forEach(([k, v]) => {
        if (Array.isArray(v)) {
            parsed[k] = make_responsive(v, default_tshirt_sizes)(size$)
            return
        } else {
            parsed[k] = v
            return
        }
    })
    return parsed
}

export const useR$ = configResponsiveStyler(CTX)

// TODO: FUCKIN DRAW/SKETCH! 🔥

//interface IFlex {
//    size$?: string
//    style?: CSS.Properties
//}

//export const MoStyledAs = ({ as = "div", style, label, children, ...props }: MoStyledProps) => {
//    const parsedStyles = parseDynamicStyles({ style, label, ...props })
//    const El = moStyled(as)(({ size$, style }: IFlex) => ({
//        ...style,
//    }))
//}
//export const ExampleUse = props => (
//    <StyledAs
//        {...props}
//        as="div"
//        style={{
//            width: ["5rem", "10rem"],
//            fontSize$: ["2rem", "3rem"],
//            backgroundColor: (_, { color }) => color,
//            fontFamily: ({ font }) => font,
//        }}
//        color="blue"
//    >
//        ExampleUse
//    </StyledAs>
//)
