/** @jsxImportSource @emotion/react */
import React from "react"
//import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { Link } from "./Link"
import { ratio } from "../theme"

const Wrap = ({ children }) => (
    <motion.div
        css={{
            display: "flex",
            overflow: "hidden",
            width: "100%",
            maxWidth: "600px",
            //minHeight: "200px",
            marginBottom: "35px",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            borderRadius: "10px",
            boxShadow: "14px 14px 40px 0 rgba(118, 126, 173, 0.1)",
        }}
    >
        {children}
    </motion.div>
)

const width = 40
const Image = ({ src }) => (
    <motion.img
        css={{
            height: width / ratio.gum + "rem",
            maxWidth: width + "rem",
            objectFit: "cover",
            //alignSelf: "right",
        }}
        src={src}
    />
)

const Title = ({ href, children }) => (
    <Link
        css={{
            fontFamily: "DM Serif Text",
            fontSize: "2rem",
            position: "absolute",
            //bottom: 0,
            right: 0,
            zIndex: 10,
            width: "100%",
        }}
        href={href}
    >
        {children}
    </Link>
)

export const Card = ({ img, href, title, ...props }) => {
    return (
        <Wrap {...props}>
            <Title href={href}>{title}</Title>
            <Image src={img} />
        </Wrap>
    )
}
