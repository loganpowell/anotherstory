import React from "react"
import { Header, Link, FloodButton } from "../components"

const nav_items = [
    {
        title: "Financing Options",
        url: "./financing",
    },
    {
        title: "The Process",
        url: "./process",
    },
    {
        title: "About",
        url: "./about",
    },
]

export const Home = ({ data }) => {
    //console.log({ data })
    return (
        <>
            {/*<Header />*/}
            <FloodButton items={nav_items} />
            <pre
                style={{
                    color: "white",
                    fontSize: "1rem",
                    maxWidth: "800px",
                    overflow: "hidden",
                    fontFamily: "fira code",
                }}
            >
                {JSON.stringify(data, null, 4)}
            </pre>
            <Link href="./magic-move">Magic Move</Link>
        </>
    )
}
