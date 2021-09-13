import React, { createContext, useState, useMemo } from "react"
import { registerRouterDOM } from "@-0/browser"
import { router } from "../router"
import { breakpoint$ } from "./streams"

export const _NAVIGATE = registerRouterDOM(router)

//console.log({ _NAVIGATE })
export const CTX = createContext(null)

export const Provider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [size, setSize] = useState(null)
    breakpoint$.map((x: string) => {
        //console.log({ x })
        if (x !== size) return setSize(x)
        return false
    })
    // TODO: session storage goes here
    //const [page, setPage] = useState(null)

    const mem = useMemo(
        () => ({
            user,
            setUser,
            size,
            //setPage,
        }),
        [user, setUser, size /*, page, setPage */]
    )

    return <CTX.Provider value={mem}>{children}</CTX.Provider>
}
