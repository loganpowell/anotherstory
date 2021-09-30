import React, { useContext } from "react"
import { motion, MotionStyle } from "framer-motion"
import styled, { CreateStyled } from "@emotion/styled"
import { isFunction, isArray } from "@thi.ng/checks"
import { make_responsive, default_tshirt_sizes } from "./responsive"
import { CTX } from "../context"

import * as CSS from "csstype"

// TODO: Move to ./responsive
type RArr = (string | number)[]
type RFun = (props: React.ReactPropTypes, theme: Record<string, any>) => null
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
        // Add a CSS Custom Property
        //'--theme-color'?: 'black' | 'white';

        // ...or allow any other property
        //[index: string]: any;
    }
}

interface IFlex {
    size?: string
    style?: CSS.Properties
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

type PropsOf<Tag> = Tag extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[Tag]
    : Tag extends React.ComponentType<infer Props>
    ? Props & JSX.IntrinsicAttributes
    : never

export const styleConfig =
    (CTX: React.Context<{ size: string }>, theme: Record<string, unknown>) =>
    ({
        as = "div",
        style,
        label = "x",
        children,
        ...props
    }: {
        as?: any
        style: CSS.Properties
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

//styled("div")
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
