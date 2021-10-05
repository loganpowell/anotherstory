import React from "react"

export const Icon = ({ weight, type }) => (
    <i className={"phosphor ph-" + type + (weight && "-" + weight) || ""}></i>
)
