/** @jsxImportSource @emotion/react */

import React from "react"
import { Page, Slab } from "../containers"
import { WhatWhy, BannerQuote } from "../slabs"
export const Home = ({ data }) => {
    return (
        <Page>
            <BannerQuote />
            <WhatWhy />
        </Page>
    )
}
