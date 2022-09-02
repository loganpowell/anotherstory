import { Link } from "./Link"

export const ButtonCTA = () => {
    const { colors, fontSizes, fontWeights } = useMyTheme()
    return (
        <Link
            href="/contact"
            css={{
                width: "auto",
                height: "auto",
                padding: "1.5rem 3rem",
                backgroundColor: colors.light_5,
                color: colors.dark_5,
                borderRadius: "1rem",
                fontWeight: fontWeights.bold,
                fontSize: fontSizes.sm,
            }}
        >
            Contact
        </Link>
    )
}
