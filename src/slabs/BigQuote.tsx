/** @jsxImportSource @emotion/react */

import React, { CSSProperties, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Slab, xtall_slab_padding } from "../containers"
import { AvatarQuote } from "../elements"

export const BigQuote = () => {
    return (
        <Slab bg="light_5" padding={xtall_slab_padding}>
            <AvatarQuote
                src="https://media-exp1.licdn.com/dms/image/C4E03AQGkR9oycFOYYA/profile-displayphoto-shrink_200_200/0/1517723992109?e=1640822400&v=beta&t=TF-TQv6g7R_SW9eEDcL45xiFphzrFadaus3Qu9jScXc"
                color="dark_5"
                text="[This] team has more vision, imagination and problem solving ability than all five previous architects (combined) with whom we have done projects. their design-build approach simplifies multiple meetings and miscommunications between a separate contractor and architect. The end result of our renovation is stunning."
                name="Sheri Spain Long"
                location="Birmingham, AL"
                quote_size={["sm", null, "md"]}
            />
        </Slab>
    )
}
