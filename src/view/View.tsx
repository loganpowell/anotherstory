import React, { useContext, useLayoutEffect, useEffect, useState } from "react"
import { getIn } from "@thi.ng/paths"
//import { isFunction } from "@thi.ng/checks"
import { $store$, API } from "@-0/browser"
import { isEmpty } from "../utils"
import { createCursor } from "../hooks"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion"

export const DefaultLoader = () => {
    console.log("loading...")
    return (
        <div className="spinner_container" style={{ marginTop: "64px" }}>
            <div className="spinner">
                <h1> fetching data... </h1>
            </div>
        </div>
    )
}

const getScrollPos = () => ({
    x: window.scrollX,
    y: window.scrollY,
})
// TODO: @-0/react figure out how to AnimatePresence...
//                                                 d8    d8b
//   e88~~8e  Y88b  /  888-~88e   e88~-_  888-~\ _d88__ !Y88!
//  d888  88b  Y88b/   888  888b d888   i 888     888    Y8Y
//  8888__888   Y88b   888  8888 8888   | 888     888     8
//  Y888    ,   /Y88b  888  888P Y888   ' 888     888     e
//   "88___/   /  Y88b 888-_88"   "88_-~  888     "88_/  "8"
//                     888
//
export const View = ({ store = $store$ }) => {
    const useCursor = createCursor(store)
    const [loading] = useCursor([API._, API.$$_LOAD], "View loading", true)

    const state = store.deref()

    //console.log({ state })

    //const is_home = !path.length
    const Page = (!loading && getIn(state, [API._, API.$$_VIEW])()) || null
    const path = (!loading && getIn(state, [API._, API.$$_PATH])) || []

    // @ts-ignore
    const data = getIn(state, path)
    //console.log({ Page, data, loading, ...getScrollPos() })

    return (
        <AnimatePresence
        //exitBeforeEnter
        //onExitComplete={() => {
        //    console.log("scrollposition before:", getScrollPos())
        //    window.scrollTo({ top: 0 })
        //    console.log("scrollposition after:", getScrollPos())
        //}}
        >
            {!loading && <Page data={data} />}
        </AnimatePresence>
    )
}
