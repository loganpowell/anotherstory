import React from "react"
import { Header, Link, FloodButton } from "../components"

export const Home = ({ data }) => {
    //console.log({ data })
    return (
        <>
            {/*<Header />*/}
            <FloodButton>===</FloodButton>
            <pre
                style={{
                    color: "white",
                    fontSize: "1rem",
                    maxWidth: "800px",
                    overflow: "hidden",
                    fontFamily: "Bitter",
                }}
            >
                {JSON.stringify(data, null, 4)}
            </pre>
            <Link href="./magic-move">Magic Move</Link>
        </>
    )
}
