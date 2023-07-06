import cx from "classnames"

export const Divider = ({vertical = false, className}: {
    vertical?: boolean
    className?: string
}) => {

    return (
        <div
            className={cx(
            {
                "w-full h-px": !vertical,
                "h-full w-px": vertical,
            },
            "bg-border",
            className
            )}
        />
    )
}