import React, { createContext, useState, useMemo } from "react"
import { registerRouterDOM } from "@-0/browser"
import { router } from "../router"
import { useSize$ } from "../hooks"

export const _NAVIGATE = registerRouterDOM(router)

//console.log({ _NAVIGATE })
export const CTX = createContext(null)

export const MyProvider = ({ children }) => {
    // TODO: session storage goes here
    const [user, setUser] = useState(null)
    const size$ = useSize$(null)
    //const [page, setPage] = useState(null)

    const mem = useMemo(
        () => ({
            user,
            setUser,
            size$,
            //setPage,
        }),
        [user, setUser, size$ /*, page, setPage */]
    )

    return <CTX.Provider value={mem}>{children}</CTX.Provider>
}
