import React, { useContext } from "react"
import { motion, MotionStyle, MotionProps } from "framer-motion"
import styled, { CreateStyled } from "@emotion/styled"
import { isFunction, isArray } from "@thi.ng/checks"
import { make_responsive, default_tshirt_sizes } from "./responsive"
import { CTX } from "../context"

import * as CSS from "csstype"

// TODO: Move to ./responsive
type RArr = (string | number)[]
type RFun = (theme: Record<string, any>, props: React.ReactPropTypes) => null
type Responsive = RArr | RFun

// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module "csstype" {
    interface Properties {
        // Add a missing property
        //WebkitRocketLauncher?: string;

        lineHeight?: CSS.Property.LineHeight | Responsive
        color?: CSS.Property.Color | Responsive
        fontSize?: CSS.Property.FontSize | Responsive
        width?: CSS.Property.Width | Responsive
        height?: CSS.Property.Height | Responsive
        padding?: CSS.Property.Padding | Responsive
        paddingTop?: CSS.Property.PaddingTop | Responsive
        paddingBottom?: CSS.Property.PaddingBottom | Responsive
        paddingRight?: CSS.Property.PaddingRight | Responsive
        paddingLeft?: CSS.Property.PaddingLeft | Responsive
        borderColor?: CSS.Property.BorderColor | Responsive
        // Add a CSS Custom Property
        //'--theme-color'?: 'black' | 'white';

        // ...or allow any other property
        //[index: string]: any;
    }
}

export interface StyledProps extends React.HTMLAttributes<HTMLElement> {
    as?: any
    label?: string
    size?: string
    style?: CSS.Properties
    children?: React.ReactNode
}

export interface MoStyledProps extends MotionProps {
    as?: any
    label?: string
    size?: string
    style?: CSS.Properties
    children?: React.ReactNode
}

export type DynamicProps = StyledProps | MoStyledProps

export const configureDynamicStyler =
    (CTX: React.Context<{ size: string }>, theme: Record<string, any>) =>
    //({ as = "div", style, label = "x", children, ...props }: MoStyleProps) => {
    ({ style, label = "x", ...props }: DynamicProps) => {
        const { size } = useContext(CTX)
        const parsedStyles = {}
        Object.entries(style).forEach(([k, v]) => {
            if (isArray(v)) {
                parsedStyles[k] = make_responsive(v, default_tshirt_sizes, label)(size)
                return
            }
            if (isFunction(v)) {
                parsedStyles[k] = v(theme, props)
                return
            } else {
                parsedStyles[k] = v
                return
            }
        })

        return parsedStyles
    }

const theme = {
    font: "Fira Code",
    colors: { base: ["white", "black", "#F6F6EE"] },
}

// FIXME: not exportable...
export const parseDynamicStyles = configureDynamicStyler(CTX, theme)

export const StyledAs = ({ as = "div", style, label, children, ...props }: DynamicProps) => {
    const parsedStyles = parseDynamicStyles({ style, label, ...props })
    const El = styled(as)({
        ...parsedStyles,
        label,
    })
    return <El {...props}>{children}</El>
}

// FIXME: this doesn't work when it's exported -> imported 🧐
export const moStyled = (element: keyof JSX.IntrinsicElements) => styled(motion[element])

//interface IFlex {
//    size?: string
//    style?: CSS.Properties
//}

//export const MoStyledAs = ({ as = "div", style, label, children, ...props }: MoStyledProps) => {
//    const parsedStyles = parseDynamicStyles({ style, label, ...props })
//    const El = moStyled(as)(({ size, style }: IFlex) => ({
//        ...style,
//    }))
//}
//export const ExampleUse = props => (
//    <StyledAs
//        {...props}
//        as="div"
//        style={{
//            width: ["5rem", "10rem"],
//            fontSize: ["2rem", "3rem"],
//            backgroundColor: (_, { color }) => color,
//            fontFamily: ({ font }) => font,
//        }}
//        color="blue"
//    >
//        ExampleUse
//    </StyledAs>
//)
