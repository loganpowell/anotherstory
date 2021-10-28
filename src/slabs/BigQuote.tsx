/** @jsxImportSource @emotion/react */

import React, { CSSProperties, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Slab, xtall_slab_padding } from "../containers"
import { AvatarQuote } from "../elements"

export const BigQuote = () => {
    return (
        <Slab bg="light_5" padding={xtall_slab_padding}>
            <AvatarQuote
                src="https://static.wixstatic.com/media/f1b74c_574091e1a68b4a4b8c8cb4671bae2eb1~mv2_d_4016_6016_s_4_2.jpg/v1/fill/w_536,h_550,al_c,q_80,usm_0.66_1.00_0.01/Image-empty-state.webp"
                color="dark_5"
                text="[This] team has more vision, imagination and problem solving ability than all five previous architects (combined) with whom we have done projects. their design-build approach simplifies multiple meetings and miscommunications between a separate contractor and architect. The end result of our renovation is stunning."
                name="Sheri Spain Long"
                location="Birmingham, AL"
                quote_size={["sm", null, "md"]}
            />
        </Slab>
    )
}
