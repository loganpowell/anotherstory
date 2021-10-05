export const one_border = ([side, width, borderColor]) => {
    return {
        borderColor,
        borderStyle: "solid",
        borderTopWidth: "0",
        borderBottomWidth: "0",
        borderLeftWidth: "0",
        borderRightWidth: "0",
        [`border${side}Width`]: width,
    }
}
