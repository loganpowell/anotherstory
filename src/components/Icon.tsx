import React from "react"
import { StyledAs } from "../for-export"
import * as CSS from "csstype"

export const Icon = ({ weight, type }) => (
    <i className={"phosphor ph-" + type + (weight && "-" + weight) || ""}></i>
)
