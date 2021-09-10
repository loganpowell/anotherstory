import React from "react"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion"
//import { Header, Item, List } from "./components"
import { View } from "./view"
import { Provider } from "./context"
import { theme } from "./theme"
import { log$ } from "@-0/browser"

import { out$ } from "@-0/spool"
import { trace } from "@thi.ng/rstream"
import { ThemeProvider } from "@emotion/react"
// log$.subscribe(trace("log$:"))

//console.log("all subs:", out$.topics.entries())

export default function App() {
    return (
        <div className="container">
            <ThemeProvider theme={theme}>
                <Provider>
                    <AnimateSharedLayout type="crossfade">
                        {/*<Header />*/}
                        <View />
                    </AnimateSharedLayout>
                </Provider>
            </ThemeProvider>
        </div>
    )
}
