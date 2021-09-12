import React, { createContext, useState, useMemo } from "react"
import { registerRouterDOM } from "@-0/browser"
import { router } from "../router"

export const _NAVIGATE = registerRouterDOM(router)

//console.log({ _NAVIGATE })
export const CTX = createContext(null)

export const Provider = ({ children }) => {
    const [user, setUser] = useState(null)
    // TODO: session storage goes here
    //const [page, setPage] = useState(null)

    const mem = useMemo(
        () => ({
            user,
            setUser,
            //page,
            //setPage,
        }),
        [user, setUser /*, page, setPage */]
    )

    return <CTX.Provider value={mem}>{children}</CTX.Provider>
}
