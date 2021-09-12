import { EquivMap } from "@thi.ng/associative"
import {
    $store$,
    run$,
    registerRouterDOM,
    API,
    URL2obj,
    SET_STATE,
    DOMnavigated$,
    registerCMD,
    _HREF_PUSHSTATE_DOM,
} from "@-0/browser"
import Airtable from "airtable"
//import { __DOM_URL__ROUTE } from "@-0/browser/lib/tasks/routing"
//import { Err_missing_props } from "@-0/utils"
//import { URL_DATA, URL_PAGE } from "@-0/keys"
import dotenv from "dotenv"
import fetch from "node-fetch"
import { items } from "../misc/data"
import { Magic, Move, Stub, Home } from "../pages"

dotenv.config()

const apiKey = process.env.REACT_APP_AIRTABLE

//console.log({ apiKey })
Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey,
})
const base = Airtable.base("appK6q2gwVCCc0gmF")

const getItems = async () => {
    const res: any[] = await new Promise((resolve, reject) => {
        let acc = []
        base("dummy")
            .select({ maxRecords: 12 })
            .eachPage(
                (records, nextPage) => {
                    //console.log({ records })
                    records.forEach(r => acc.push(r.fields))
                    nextPage()
                },
                function done(e) {
                    if (e) throw new Error(e)
                    return resolve(acc)
                }
            )
    })

    const parsed = res.map(({ category, id, image, title }) => ({
        category,
        id,
        image: image[0].url,
        title,
    }))
    //console.log({ parsed })
    return await parsed
}
//console.log({ base })

export const urlToPageConfig = async URL => {
    const match = URL2obj(URL)
    const { _PATH } = match

    const [_1, _2, _3] = _PATH
    const { page, data } = new EquivMap([
        [
            { ...match, _PATH: [] },
            { page: () => Home, data: async () => ({ items: await getItems() }) },
        ],
        [
            { ...match, _PATH: ["magic-move"] },
            { page: () => Magic, data: getItems },
        ],
        [
            { ...match, [_PATH.length === 2 && "_PATH"]: ["magic-move", _2] },
            { page: () => Move, data: getItems },
        ],
    ]).get(match) || {
        page: d => console.log("404 Page:", d),
        data: () => Promise.resolve({}),
    }

    const res = await data()
    //console.log({ res })
    return {
        [API.URL_DATA]: res,
        [API.URL_PAGE]: page,
    }
}

// SCROLL HANDLING //

if ("scrollRestoration" in window.history) {
    // Back off, browser, I got this...
    window.history.scrollRestoration = "manual"
}

const LOG_PROP = (PROP: string) =>
    registerCMD({
        [API.CMD_SUB$]: "_LOG_PROP_" + PROP,
        // @ts-ignore
        [API.CMD_ARGS]: ({ [PROP]: target }) => ({ [PROP]: target }),
        [API.CMD_WORK]: ({ [PROP]: target }) =>
            console.log("Logging for " + PROP, JSON.stringify(target, null, 2)),
    })

const LOG_POP_STATE = LOG_PROP(API.POP_STATE)
const LOG_PUSH_STATE = LOG_PROP(API.PUSH_STATE)

const LOG_ACC = registerCMD({
    [API.CMD_SUB$]: "LOG_ACC",
    [API.CMD_ARGS]: acc => acc,
    [API.CMD_WORK]: acc => console.log({ acc }),
})
const getScrollPos = () => ({
    [API.SCROLL_X]: window.scrollX,
    [API.SCROLL_Y]: window.scrollY,
})

const scrollodex = new Map()

export const PUSH = registerCMD({
    [API.CMD_SUB$]: "PUSH",
    [API.CMD_ARGS]: acc => acc,
    [API.CMD_WORK]: acc => {
        const url = acc[API.URL_FULL]
        const node = acc[API.DOM_NODE]
        //const pop = acc[POP_STATE]
        const push = acc[API.PUSH_STATE]
        const props = {
            [API.URL_FULL]: url,
            [API.DOM_NODE]: node,
            [API.PUSH_STATE]: push,
        }
        const href = window.location.href
        // has reqs and not from window (e.g., popstate)
        // i.e., from <a href...> click
        if (url && node.href) {
            const state = getScrollPos()
            const href = window.location.href
            console.log("setting scrollodex for:", href, "to", state)
            scrollodex.set(href, state)
            return window.history.pushState({ FROM: window.location.href }, document.title, url)
        }
    },
})
const RESTORE_SCROLL = registerCMD({
    [API.CMD_SUB$]: "RESTORE_SCROLL",
    [API.CMD_ARGS]: ({ [API.DOM_NODE]: node, POP_STATE: pop, [API.URL_FULL]: furl }) => ({
        [API.DOM_NODE]: node,
        POP_STATE: pop,
        [API.URL_FULL]: furl,
    }),
    [API.CMD_WORK]: ({ [API.DOM_NODE]: node, POP_STATE: pop, [API.URL_FULL]: furl }) => {
        if (pop) {
            console.log("state popped:", pop)
            const { [API.SCROLL_X]: x, [API.SCROLL_Y]: y } = scrollodex.get(furl) || {
                [API.SCROLL_X]: 0,
                [API.SCROLL_Y]: 0,
            }
            //console.log("scrolling to:", { x, y }, node)
            window.scrollTo(x, y)
        }
    },
})
export const router = {
    [API.CFG_RUTR]: urlToPageConfig,
    [API.RTR_PREP]: [PUSH],
    [API.RTR_POST]: [LOG_ACC, LOG_POP_STATE, LOG_PUSH_STATE, RESTORE_SCROLL],
}
