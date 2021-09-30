export const one_border = ([borderXWidth, width]) => ({
    borderColor: (_, { colors }) => colors.base[1],
    borderStyle: "solid",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    [borderXWidth]: width,
})
