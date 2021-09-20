import React from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { Link } from "./Link"

const Wrap = styled("div")({
    display: "flex",
    overflow: "hidden",
    width: "100%",
    maxWidth: "600px",
    minHeight: "200px",
    marginBottom: "35px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: "10px",
    boxShadow: "14px 14px 40px 0 rgba(118, 126, 173, 0.1)",
})

const Image = styled("img")({
    height: "100px",
    width: "400px",
    objectFit: "cover",
    //alignSelf: "right",
})

const Title = styled(Link)({
    fontFamily: "DM Serif Text",
    fontSize: "2rem",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 10,
    width: "100%",
})

export const Card = ({ img, href, title, ...props }) => {
    return (
        <Wrap {...props}>
            <Title href={href}>{title}</Title>
            <Image src={img} />
        </Wrap>
    )
}
