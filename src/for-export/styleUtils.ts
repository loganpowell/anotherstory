export const one_border = (side = "Top", width: string | number = 0, borderColor = "grey") => {
    return {
        borderColor,
        borderStyle: "solid",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        [`border${side}Width`]: width,
    }
}
