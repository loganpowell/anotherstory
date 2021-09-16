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
            {
                page: () => Home,
                data: async () => ({ items: await getItems() }),
            },
        ],
        [
            { ...match, _PATH: ["magic-move"] },
            { page: () => Magic, data: getItems },
        ],
        [
            { ...match, _PATH: ["magic-move", _2] },
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

const LOG_POP_STATE = LOG_PROP(API.POP_STATE)

export const router = {
    [API.CFG_RUTR]: urlToPageConfig,
    //[API.RTR_PREP]: [PUSH],
    //[API.RTR_POST]: [LOG_POP_STATE],
}
