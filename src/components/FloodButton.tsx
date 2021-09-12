import React, { useState } from "react"
import styled from "@emotion/styled"
import { space, color, typography, layout, shadow } from "styled-system"
import { motion, AnimatePresence } from "framer-motion"
import { theme } from "../theme"

const StyMoDiv = styled(motion.div)(
    {
        position: "absolute",
        top: "2rem",
        right: "1rem",
        width: "fit-conte",
        height: "fit-content",
        //overflow: "hidden",
        resize: "both",
        background: theme.colors.muted,
        fontFamily: "Fira Code",
        //fontWeight: 800,
        transform: "rotate(-45deg)",
        boxShadow: `0 0 0 200vmax ${theme.colors.muted}`,
        clipPath: "circle(71%)",
        cursor: "pointer",
    }
    //shadow,
    //color,
    //space,
    //layout
)

export const FloodButton = ({ children, ...props }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div style={{ position: "relative" }}>
            <StyMoDiv {...props} color="black">
                {children}
            </StyMoDiv>
        </div>
    )
}
