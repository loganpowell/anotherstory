import React from "react"
import { Header, Link, NavColl } from "../components"

export const Home = ({ data }) => {
    //console.log({ data })
    return (
        <>
            {/*<Header />*/}
            <NavColl>Howdy</NavColl>
            <pre
                style={{ color: "white", fontSize: "2rem", maxWidth: "800px", overflow: "hidden" }}
            >
                {JSON.stringify(data, null, 4)}
            </pre>
            <Link href="./magic-move">Magic Move</Link>
        </>
    )
}
