import React, { useContext, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { URL2obj } from "@-0/browser"
import { CTX } from "../context"
import { Header, Item, Card } from "../components"

export const Magic = ({ data }) => {
    //const me = useRef()
    return (
        <>
            <Header />
            <ul className="card-list">
                {data.map(card => {
                    return <Card key={card.id} {...card} />
                })}
            </ul>
        </>
    )
}
