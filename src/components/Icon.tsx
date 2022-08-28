//import React from "react"
import { nudge_size, useR$ } from "../for-export"
import { useMyTheme } from "../hooks"
import {
    CurrencyDollar,
    Eye,
    FaceMask,
    House,
    Image,
    MapPin,
    Package,
    SmileyNervous,
    Sun,
    TrendUp,
    Wind,
} from "phosphor-react"

const IconSet = {
    package: Package,
    house: House,
    "currency-dollar": CurrencyDollar,
    sun: Sun,
    wind: Wind,
    "trend-up": TrendUp,
    image: Image,
    "map-pin": MapPin,
    "face-mask": FaceMask,
    eye: Eye,
    "smiley-nervous": SmileyNervous,
}

// set styles in index.css
export const Icon = ({ weight, type, color = "white", size = "md" }) => {
    const { colors, fontSizes } = useMyTheme()
    const [downsize] = nudge_size(fontSizes)(size, -1)
    return (
        <span
            css={useR$({
                color: color || colors.dark_5,
                fontSize: [fontSizes[downsize], fontSizes[size]],
                lineHeight: 0,
            })}
        >
            <i className={"phosphor ph-" + type + (weight && "-" + weight)}></i>
        </span>
    )
}
