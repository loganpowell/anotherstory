import * as CSS from "csstype"
import { MotionStyle, MotionProps } from "framer-motion"
import { phosphor_weights } from "./constants"
import { theme } from "../theme"

export type FontSize = keyof typeof theme.fontSizes
export type Space = keyof typeof theme.space
export type Color = keyof typeof theme.colors
export type Font = keyof typeof theme.fonts

type RArr = (string | number)[]
type RFun = (theme: Record<string, any>, props: React.ReactPropTypes) => null
type Responsive = RArr | RFun

// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module "csstype" {
    interface Properties {
        // Add a missing property
        //WebkitRocketLauncher?: string;
        size?: string
        label?: string
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
        right?: CSS.Property.Right | Responsive
        top?: CSS.Property.Top | Responsive
        flexDirection?: CSS.Property.FlexDirection | Responsive
        letterSpacing?: CSS.Property.LetterSpacing | Responsive
        alignItems?: CSS.Property.AlignItems | Responsive
        gap?: CSS.Property.Gap | Responsive
        // Add a CSS Custom Property
        //'--theme-color'?: 'black' | 'white';

        // ...or allow any other property
        //[index: string]: any;
    }
}

export type Styles = CSS.Properties

export type IconWeight = keyof typeof phosphor_weights

export interface IStyledProps extends React.HTMLAttributes<HTMLElement> {
    as?: any
    label?: string
    size?: string
    style?: Styles
    children?: React.ReactNode
}

export interface IMoStyledProps extends MotionProps {
    as?: any
    label?: string
    size?: string
    style?: Styles
    children?: React.ReactNode
}

export type IDynamicProps = IStyledProps | IMoStyledProps

export interface IResize {
    target: {
        width: number
        height: number
    }
}
