import React from "react"
import styled from "@emotion/styled"
// https://styled-system.com/table
import {
    space,
    color,
    typography,
    layout,
    flexbox,
    grid,
    background,
    border,
    position,
    shadow,
} from "styled-system"
import { motion } from "framer-motion"

// see also 'variants': https://styled-system.com/variants/

export const Div = styled("div")`
    ${space}
    ${color}
    ${typography}
    ${layout}
`
export const MDiv = styled(motion.div)`
    ${space}
    ${color}
    ${typography}
`
