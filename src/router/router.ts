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
    LOG_PROP,
    cmd_inject_head,
} from "@-0/browser"

import Airtable from "airtable"
//import { __DOM_URL__ROUTE } from "@-0/browser/lib/tasks/routing"
//import { Err_missing_props } from "@-0/utils"
import { URL_DATA, URL_PAGE, Router } from "@-0/keys"
import dotenv from "dotenv"
import fetch from "node-fetch"
import { items } from "../misc/data"
import { Magic, Move, Stub, Home, Contact, Process, About } from "../pages"

//dotenv.config()

const apiKey = import.meta.env.VITE_AIRTABLE

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

    return await parsed
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}

const getTeam = async () => {
    const res: any[] = await new Promise((resolve, reject) => {
        let acc = []
        base("team")
            .select({ maxRecords: 20 })
            .eachPage(
                (records, nextPage) => {
                    records.forEach(r => {
                        const { name, role, quote, bio_short, avatar } = r.fields
                        acc.push({ name, role, quote, bio_short, avatar: avatar[0]?.url })
                    })
                    nextPage()
                },
                e => {
                    if (e) throw new Error(e)
                    return resolve(acc)
                }
            )
    })

    return res.sort(compare)
}
const getTimelineData = async (keep = ["order", "time", "title", "icon"]) => {
    const res: any[] = await new Promise((resolve, reject) => {
        let acc = []
        base("timeline")
            .select({ maxRecords: 12 })
            .eachPage(
                (records, nextPage) => {
                    //console.log({ records })
                    records.forEach(r => {
                        //const { order, time, icon, title, description } = r.fields
                        const take = {}
                        keep.forEach(f => (take[f] = r.fields[f]))
                        acc.push(take)
                        //acc.push({ order, time, title })
                    })
                    nextPage()
                },
                function done(e) {
                    if (e) throw new Error(e)
                    //console.log("Finished loading airtable Timeline:", acc)
                    return resolve(acc)
                }
            )
    })
    return res.sort(({ order: a }, { order: b }) => a - b)
}

export const urlToPageConfig: Router = async URL => {
    const match = URL2obj(URL)
    const { _PATH } = match

    const [_1, _2, _3] = _PATH
    const {
        [API.URL_PAGE]: page,
        [API.URL_DATA]: { [API.DOM_BODY]: body, [API.DOM_HEAD]: head },
    } = new EquivMap([
        [
            { ...match, _PATH: [] },
            {
                [API.URL_PAGE]: () => Home,
                [API.URL_DATA]: {
                    // need the extra "data" prop to nest home state inside global atom
                    [API.DOM_BODY]: async () => ({ data: await getTimelineData() }),
                    [API.DOM_HEAD]: {
                        title: "AnotherStory",
                        favicon: "/favicon.ico",
                        og_description: "Build Another Story - Without Moving!",
                        og_image: "/images/stair.png",
                        //og_image_width: "",
                        //og_image_height: "",
                        //og_type: "",
                    },
                },
            },
        ],
        [
            { ...match, _PATH: ["contact"] },
            {
                [API.URL_PAGE]: () => Contact,
                [API.URL_DATA]: {
                    [API.DOM_BODY]: () => ({}),
                    [API.DOM_HEAD]: {
                        title: "Contact Us",
                        favicon: "/favicon.ico",
                        og_description: "Sign up for a free 15-minute consultation",
                        og_image: "/images/finance.png",
                        //og_image_width: "",
                        //og_image_height: "",
                        //og_type: "",
                    },
                },
            },
        ],
        [
            { ...match, _PATH: ["process"] },
            {
                [API.URL_PAGE]: () => Process,
                [API.URL_DATA]: {
                    [API.DOM_BODY]: async () =>
                        await getTimelineData(["order", "time", "title", "icon", "description"]),
                    [API.DOM_HEAD]: {
                        title: "Our Process",
                        favicon: "/favicon.ico",
                        og_description: "Move into Your Second Story in a Year or Less",
                        og_image: "/images/living.png",
                        //og_image_width: "",
                        //og_image_height: "",
                        //og_type: "",
                    },
                },
            },
        ],
        [
            { ...match, _PATH: ["about"] },
            {
                [API.URL_PAGE]: () => About,
                [API.URL_DATA]: {
                    [API.DOM_BODY]: () => ({}), // async () => await getTeam(),
                    [API.DOM_HEAD]: {
                        title: "About Us",
                        favicon: "/favicon.ico",
                        og_description: "The AnotherStory Story",
                        og_image: "/images/about-us.png",
                        //og_image_width: "",
                        //og_image_height: "",
                        //og_type: "",
                    },
                },
            },
        ],
        //[
        //    { ...match, _PATH: ["magic-move"] },
        //    {
        //        [API.URL_PAGE]: () => Magic,
        //        [API.URL_DATA]: {
        //            [API.DOM_BODY]: getItems,
        //        },
        //    },
        //],
        //[
        //    { ...match, _PATH: ["magic-move", _2] },
        //    {
        //        [API.URL_PAGE]: () => Move,
        //        [API.URL_DATA]: {
        //            [API.DOM_BODY]: getItems,
        //        },
        //    },
        //],
    ]).get(match) || {
        [API.URL_PAGE]: () => Home,
        [API.URL_DATA]: {
            // need the extra "data" prop to nest home state inside global atom
            [API.DOM_BODY]: async () => ({ data: await getTimelineData() }),
        },
    }

    const res = await body()
    //const state = $store$.deref()
    //console.log({ res, state })
    return {
        [API.URL_DATA]: {
            [API.DOM_BODY]: res,
            [API.DOM_HEAD]: head,
        },
        [API.URL_PAGE]: page,
    }
}
const INJECT_HEAD = registerCMD(cmd_inject_head)

const SET_PRERENDER_FALSE = registerCMD({
    sub$: "SET_PRERENDER_FALSE",
    args: x => x,
    work: () => {
        console.log("window.prerenderReady = false")
        //@ts-ignore
        window.prerenderReady = false
    },
})

const SET_PRERENDER_TRUE = registerCMD({
    sub$: "SET_PRERENDER_TRUE",
    args: x => x,
    work: acc => {
        // use setTimetout to push prerenderReady to end of current event queue
        setTimeout(() => {
            const html = document.body.innerHTML
            console.log("window.prerenderReady = true" /*, { acc, html } */)
            //@ts-ignore
            window.prerenderReady = true
        }, 0)
    },
})

const LOG_POP_STATE = LOG_PROP(API.POP_STATE)
const LOG_TO_GA = registerCMD({
    sub$: "LOG_TO_GA",
    args: x => x,
    work: ({ _FURL }) => {
        const {
            _PATH: [page],
        } = URL2obj(_FURL)
        //@ts-ignore
        ga("set", "page", `/${page}.html`)
        //@ts-ignore
        ga("send", "pageview")
    },
})

export const router: API.RouterCFG = {
    [API.CFG_RUTR]: urlToPageConfig,
    [API.RTR_PREP]: [SET_PRERENDER_FALSE],
    ignore_prefix: "anotherstory",
    [API.RTR_POST]: [LOG_TO_GA, INJECT_HEAD, SET_PRERENDER_TRUE],
}
