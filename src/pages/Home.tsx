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
            <div
                style={{
                    overflow: "hidden",
                    width: "100vw",
                    position: "relative",
                }}
            >
                <pre
                    style={{
                        color: "white",
                        fontSize: "1rem",
                        width: "100%",
                        //display: "block",
                        fontFamily: "fira code",
                    }}
                >
                    {JSON.stringify(data, null, 4)}
                </pre>
            </div>
            <Link href="./magic-move">Magic Move</Link>
        </>
    )
}
