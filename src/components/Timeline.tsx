import React from "react"
import styled from "@emotion/styled"
import { make_responsive, moStyled } from "../for-export"
import { Header, Link, FloodButton, Slab, Icon } from "../components"
import { StyledAs, one_border } from "../for-export"

const DotStem = ({ height }) => (
    <StyledAs
        as="span"
        label="dot-stem"
        style={{
            width: "auto",
            height,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
        }}
    ></StyledAs>
)

const TimelineRow = ({ children, height }) => (
    <StyledAs
        label="row"
        style={{
            width: "100%",
            height,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "stretch",
            overflow: "hidden",
        }}
    >
        {children}
    </StyledAs>
)

export const TLItem = ({
    time,
    icon,
    title,
    description,
    borders = true,
    ...props
}: {
    time?: string
    icon?: string
    title?: string
    description?: string
    borders?: boolean
}) => {
    return (
        <StyledAs
            as="li"
            label="tl-item"
            style={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                overflow: "hidden",
            }}
        >
            {/*TOP ROW*/}
            <TimelineRow height="58px">
                <StyledAs
                    as="span"
                    label="tl-top-left"
                    // @ts-ignore
                    style={{
                        width: "30%",
                        height: "100%",
                        ...one_border(["borderRightWidth", 1]),
                    }}
                />
                <StyledAs
                    as="span"
                    label="tl-top-right"
                    // @ts-ignore
                    style={{
                        width: "70%",
                        height: "100%",
                        ...one_border(["borderLeftWidth", 1]),
                    }}
                />
            </TimelineRow>

            <StyledAs
                label="tl-middle-row"
                style={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <StyledAs
                    as="p"
                    label="tl-time"
                    style={{
                        width: "27%",
                        height: "auto",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        fontWeight: 300,
                        //fontStyle: "normal",
                        fontFamily: '"Fira Code", serif',
                        color: ({ colors }) => colors.base[1],
                        fontSize: ["1.6rem", "2rem", "2.5rem"],
                        letterSpacing: "-0.08rem",
                        paddingTop: ["0.5rem", ".9rem", "0.7rem", "1.2rem"],
                        lineHeight: 1.2,
                        textAlign: "right",
                    }}
                >
                    {time}
                </StyledAs>
                <StyledAs
                    label="tl-dot-block"
                    style={{
                        width: "6%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    <DotStem height={["1rem", "1.3rem", "1.2rem", "1.7rem"]} />
                    <StyledAs
                        label="tl-dot"
                        style={{
                            width: ["1rem", "1.5rem", "2rem"],
                            height: ["1rem", "1.5rem", "2rem"],
                            overflow: "hidden",
                            borderRadius: "1rem",
                            border: "3px solid",
                            borderColor: ({ colors }) => colors.base[1],
                        }}
                    />
                </StyledAs>
                <StyledAs
                    as="h4"
                    label="tl-title"
                    style={{
                        height: "auto",
                        width: "65%",
                        overflow: "hidden",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //@ts-ignore

                        color: ({ colors }) => colors.base[1],
                        fontSize: ["2.4rem", "3rem", "3.5rem", "4.5rem"],
                        fontWeight: 800,
                        paddingTop: [".1rem", ".3rem", ".2rem", "0rem"],
                        letterSpacing: "-0.08rem",
                        lineHeight: 1.2,
                        textAlign: "left",
                    }}
                >
                    {title}
                </StyledAs>
            </StyledAs>
            <TimelineRow height="100%">
                <StyledAs
                    label="tl-bottom-left"
                    // @ts-ignore
                    style={{
                        width: "30%",
                        ...(borders && one_border(["borderRightWidth", ".1rem"])),
                    }}
                >
                    <StyledAs
                        label="tl-icon"
                        style={{
                            padding: "2rem 3rem 0rem 0rem",
                            width: "100%",
                            height: "100%",
                            fontWeight: 300,
                            //@ts-ignore
                            color: ({ colors }) => colors.base[1],
                            fontSize: "2rem",
                            letterSpacing: "-0.8px",
                            lineHeight: "1",
                            textAlign: "right",
                        }}
                    >
                        <Icon type={icon} weight="thin" />
                        {/*<p>{icon}</p>*/}
                    </StyledAs>
                </StyledAs>
                <StyledAs
                    label="tl-bottom-right"
                    // @ts-ignore
                    style={{
                        width: "70%",
                        height: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: "20px 30px 0px 30px",
                        overflow: "visible",
                        ...(borders && one_border(["borderLeftWidth", ".1rem"])),
                    }}
                >
                    <StyledAs
                        as="p"
                        label="tl-description"
                        style={{
                            height: "auto ",
                            width: "100%",
                            overflow: "hidden",
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                            fontWeight: 200,
                            //@ts-ignore
                            color: ({ colors }) => colors.base[1],
                            fontSize: ["2rem", "2.5rem"],
                            letterSpacing: "-0.8px",
                            lineHeight: "1.3",
                            textAlign: "left",
                        }}
                    >
                        {description}
                    </StyledAs>
                </StyledAs>
            </TimelineRow>
        </StyledAs>
    )
}

type Milestone = {
    time: string
    icon: string
    title: string
    description: string
}
type Milestones = Milestone[]

export const Timeline = ({ milestones }: { milestones: Milestones }) => (
    <StyledAs
        as="ul"
        label="stack"
        style={{
            height: "auto" /* 241px */,
            flexShrink: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            overflow: "hidden",
        }}
    >
        {milestones.map(({ time, icon, title, description }, idx, { length }) => {
            return (
                <TLItem
                    key={"timeline_item" + idx}
                    time={time}
                    icon={icon}
                    title={title}
                    description={description}
                    borders={idx + 1 < length ? true : false}
                />
            )
        })}
    </StyledAs>
)
