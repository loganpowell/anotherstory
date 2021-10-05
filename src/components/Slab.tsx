import React from "react"
import styled from "@emotion/styled"
import {} from "../for-export"

const Static = styled("div")({
    width: "100vw",
    height: "50vh",
    backgroundColor: "grey",
})

const Cubert = styled("div")({
    width: "50vw",
    height: "50vh",
    clipPath:
        "path('m2075.1 2059.3 372.37 218.37 374.91-216.88v-429.53l-372.37-218.37-374.91 216.88v429.53')",
    backgroundColor: "red",
    label: "clip",
})
// <svg
//                width="997.37"
//                height="1154.2"
//                version="1.1"
//                viewBox="0 0 997.37 1154.2"
//                xmlns="http://www.w3.org/2000/svg"
//            >
//                <g transform="matrix(1.3333 0 0 -1.3333 -2766.3 3037.4)">
//                    <path
//                        d="m2075.1 2059.3 372.37 218.37 374.91-216.88v-429.53l-372.37-218.37-374.91 216.88v429.53"
//                        fill="none"
//                        stroke="#000"
//                    />
//                </g>
//            </svg>
export const Slab = () => {
    return (
        <>
            <Cubert>World</Cubert>
        </>
    )
}
