/** @jsxImportSource @emotion/react */

import React from "react"
import { Icon } from "./Icon"
import { useMyTheme } from "../hooks"
//import { theme } from "../theme"
import { FontSize, IconWeight, nudge_size } from "../for-export"
export const IconBullet = ({
    weight = "light",
    size = "sm",
    bullet = "bullet prop goes here",
    color = "",
    icon = null,
    link = null,
}: {
    weight?: IconWeight
    size?: FontSize
    icon?: string
    color?: string
    bullet: string
    link?: string
}) => {
    const {
        colors: { dark_5, light_5 },
        fontSizes,
        space,
        fonts: { serif },
        letterSpacings,
    } = useMyTheme()

    const [upsize] = nudge_size(fontSizes)(size, 2)
    const Li = () => (
        <li
            css={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: space[size],
            }}
        >
            <Icon color={light_5} type={icon} weight={weight} size={upsize} />
            <p
                css={{
                    fontFamily: serif,
                    //letterSpacing: letterSpacings[size],
                    color: color || light_5,
                    fontSize: fontSizes[size],
                }}
            >
                {bullet}
            </p>
        </li>
    )
    return link ? (
        <a
            href={link}
            css={{
                width: "100%",
            }}
        >
            <Li />
        </a>
    ) : (
        <Li />
    )
}

/**
 * @example
 * ```js
 * const bullets = [
 *   { icon: "package", point: "No moving required" },
 *   { icon: "currency-dollar", point: "No short term renting" }
 * ]
 *
 * <BulletList bullets={bullets}/>
 * ```
 */
export const BulletList = ({ bullets, size }) => {
    const { space } = useMyTheme()

    return (
        <ul
            css={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: space[size],
            }}
        >
            {bullets.map((item, idx) => {
                const { icon, point, link } = item
                return (
                    <IconBullet
                        key={"bullet" + idx}
                        icon={icon}
                        bullet={point}
                        size={size}
                        link={link}
                    />
                )
            })}
        </ul>
    )
}