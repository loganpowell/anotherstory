/** @jsxImportSource @emotion/react */

import React from "react"
//import PropTypes from "prop-types";

export const YoutubeEmbed = ({ embedId }) => (
    <div
        css={{
            overflow: "hidden",
            position: "relative",
            width: "100%",
            "&:after": {
                paddingTop: "56.25%",
                display: "block",
                content: `""`,
            },
            //"&:iframe": {
            //    left: 0,
            //    top: 0,
            //    height: "100%",
            //    width: "100%",
            //    position: "absolute",
            //},
        }}
    >
        <iframe
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="AnotherStory Process"
            src={`https://www.youtube.com/embed/${embedId}`}
        />
    </div>
)
