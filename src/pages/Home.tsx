import React from "react"
import { Header, Link, FloodButton, Slab } from "../components"
import { ExampleUse, StyledAs } from "../for-export"

const nav_items = [
    {
        title: "Financing Options",
        url: "./financing",
    },
    {
        title: "The Process",
        url: "./process",
    },
    {
        title: "About",
        url: "./about",
    },
]

const timeline_items = [
    {
        time: "Day 1",
        accronymn: "SI",
        title: "Site Inspection",
        description:
            "The first step is to determine if your home is a good candidate based on several key factors: foundation, basement, stair location(s), other factors.",
    },
    {
        time: "Week 1",
        accronymn: "DP",
        title: "Programming",
        description:
            "Decide what style of home best fits your personal preferences, neighborhood and the scale of the homes around you (context, vernacular, style, colors/materials).",
    },
    {
        time: "Week 2",
        accronymn: "DD",
        title: "Design Development",
        description: "Design development of your second-story addition and amenities.",
    },
    {
        time: "Weeks 3-4",
        accronymn: "VE",
        title: "Bidding/Value Engineering",
        description:
            "Receive estimates for construction from local construction teams. Meet with pre-vetted Contactor’s. Discuss cost and value. ",
    },
    {
        time: "Weeks 5-6",
        accronymn: "FIN",
        title: "Financing",
        description:
            "Visit with your local mortgage brokers to see if a pre-appraised construction loan can work for you. Evaluate financing options and get preapproval.",
    },
    {
        time: "Weeks 7-8",
        accronymn: "VE",
        title: "Construction Documents/Permitting",
        description:
            "Construction drawings in accordance with local covenants to ensure compliance with all codes.",
    },
    {
        time: "Weeks 9-32",
        accronymn: "WIP",
        title: "Construction",
        description:
            "During construction, cleaning crews are brought in weekly to ensure any fugitive dust/debris are kept out of the primary living space. Construction happens during business hours.",
    },

    {
        time: "Week 33",
        accronymn: "fin",
        title: "Clean Up",
        description: "Make your new space ready to wear.",
    },
]
// @ts-ignore
const DotStem = ({ height = "1.7rem" }) => (
    <StyledAs
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
            alignItems: "flex-start",
            overflow: "hidden",
        }}
    >
        {children}
    </StyledAs>
)

const TLItem = ({
    time,
    accronymn,
    title,
    description,
    borders = true,
    ...props
}: {
    time?: string
    accronymn?: string
    title?: string
    description?: string
    borders?: boolean
}) => {
    return (
        <StyledAs
            as="li"
            label="timeline-item"
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
                    label="top-left"
                    style={{
                        width: "30%",
                        height: "100%",

                        // @ts-ignore
                        borderColor: (_, { colors }) => colors.base[1],
                        borderStyle: "solid",
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 1,
                    }}
                />
                <StyledAs
                    label="top-right"
                    style={{
                        width: "70%",
                        height: "100%",
                        // @ts-ignore
                        borderColor: (_, { colors }) => colors.base[1],
                        borderStyle: "solid",
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderLeftWidth: 1,
                        borderRightWidth: 0,
                    }}
                />
            </TimelineRow>

            <StyledAs
                label="middle-row"
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
                    label="time"
                    style={{
                        width: "25%",
                        height: "auto",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        fontWeight: 300,
                        fontStyle: "normal",
                        fontFamily: '"Fira Code", serif',
                        //@ts-ignore
                        color: (_, { colors }) => colors.base[1],
                        fontSize: "33px",
                        letterSpacing: "-0.8px",
                        lineHeight: "1.4",
                        textAlign: "right",
                    }}
                >
                    {time}
                </StyledAs>
                <StyledAs
                    label="dot-block"
                    style={{
                        width: "10%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    <DotStem />
                    <StyledAs
                        label="dot"
                        style={{
                            width: "20px",
                            height: "20px",
                            overflow: "hidden",
                            borderRadius: "10px",
                            border: "3px solid",
                            //@ts-ignore
                            borderColor: (_, { colors }) => colors.base[1],
                        }}
                    />
                </StyledAs>
                <StyledAs
                    label="timeline-title"
                    style={{
                        height: "auto",
                        width: "65%",
                        overflow: "hidden",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        fontWeight: 700,

                        //@ts-ignore
                        color: (_, { colors }) => colors.base[1],
                        fontSize: "45px",
                        letterSpacing: "-0.8px",
                        lineHeight: "1.2",
                        textAlign: "left",
                    }}
                >
                    {title}
                </StyledAs>
            </StyledAs>
            <TimelineRow height={["30rem", null, "20rem", null, "15rem"]}>
                <StyledAs
                    label="bottom-left"
                    // @ts-ignore
                    style={{
                        width: "30%",
                        height: "100%",
                        overflow: "visible",
                        ...(borders && {
                            borderColor: (_, { colors }) => colors.base[1],
                            borderStyle: "solid",
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: ".1rem",
                        }),
                    }}
                >
                    <StyledAs
                        label="timeline-accronymn"
                        style={{
                            padding: "20px 30px 0px 0px",
                            width: "100%",
                            height: "100%",
                            fontWeight: 100,
                            //@ts-ignore
                            color: (_, { colors }) => colors.base[1],
                            fontSize: "33px",
                            letterSpacing: "-0.8px",
                            lineHeight: "1",
                            textAlign: "right",
                        }}
                    >
                        {accronymn}
                    </StyledAs>
                </StyledAs>
                <StyledAs
                    label="bottom-right"
                    style={{
                        // @ts-ignore
                        width: ["60%", null, null, "50%"],
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: "20px 30px 0px 30px",
                        overflow: "visible",
                        //@ts-ignore
                        ...(borders && {
                            borderColor: (_, { colors }) => colors.base[1],
                            borderStyle: "solid",
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            borderLeftWidth: 1,
                            borderRightWidth: 0,
                        }),
                    }}
                >
                    <StyledAs
                        label="tl-description"
                        style={{
                            height: "auto ",
                            width: "100%",
                            overflow: "hidden",
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                            fontWeight: 100,
                            //@ts-ignore
                            color: (_, { colors }) => colors.base[1],
                            fontSize: "28px",
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
const TimelineStack = ({ children }) => (
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
        {children}
    </StyledAs>
)
export const Home = ({ data }) => {
    //console.log({ data })
    return (
        <>
            {/*<Header />*/}
            <FloodButton items={nav_items} />
            <div
                style={{
                    overflow: "hidden",
                    width: "100vw",
                    position: "relative",
                }}
            >
                <ExampleUse />
                <TimelineStack>
                    {timeline_items.map(
                        ({ time, accronymn, title, description }, idx, { length }) => {
                            return (
                                <TLItem
                                    key={"timeline_item" + idx}
                                    time={time}
                                    accronymn={accronymn}
                                    title={title}
                                    description={description}
                                    borders={idx + 1 < length ? true : false}
                                />
                            )
                        }
                    )}
                    {/*<TLItem
                        time="Day 1"
                        accronymn="SI"
                        title="Site Inspection"
                        description="The first step is to determine if your home is a good candidate based on several key factors: foundation, basement, stair location(s), other factors."
                    />*/}
                </TimelineStack>
                <pre
                    style={{
                        color: "white",
                        fontSize: "1rem",
                        width: "100%",
                        //display: "block",
                        fontFamily: "fira code",
                    }}
                >
                    {JSON.stringify(data, null, 4)}
                </pre>
            </div>
            <Link href="./magic-move">Magic Move</Link>
        </>
    )
}
