import React from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { Link } from "./Link"

const Wrap = styled("div")({
    display: "flex",
    flexDirection: "row",
    width: "50%",
})

const Image = styled("img")({
    height: "2rem",
    width: "2rem",
    objectFit: "cover",
    alignSelf: "right",
})

const Title = styled("h4")({
    width: "100%",
})

export const Card = ({ img, href, title, ...props }) => {
    return (
        <Wrap>
            <Link href={href}>
                <Title>{title}</Title>
            </Link>
            <Image src={img} />
        </Wrap>
    )
}
