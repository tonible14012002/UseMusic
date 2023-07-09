import { ReactNode } from "react"
import cx from "classnames"

interface RowItemProps {
    className?: string
    title: ReactNode
    subTitle?: ReactNode
    leftWidget?: ReactNode
    rightWidget?: ReactNode
    widgetSize?: "sm" | "md" | "lg"
    leftWidgetClassName?: string
    rightWidgetClassName?: string
}

export const RowItem = (props: RowItemProps) => {

    const { 
        widgetSize="md",
        leftWidget,
        rightWidget,
        leftWidgetClassName,
        rightWidgetClassName,
        title,
        subTitle,
        className
    } = props

    const widgetStyle = cx(
        getWidgetSize[widgetSize],
        "shrink-0 flex items-center justify-center"
    )

    return (
        <div className={cx("flex w-full items-center gap-4 p-4", className)}>
            {!!leftWidget && (
                <span className={cx("", widgetStyle, leftWidgetClassName)}>
                    {leftWidget}
                </span>
            )}

            <div className="flex-1 overflow-hidden">
                {typeof title === "string" ? (
                    <h3 className="w-full truncate text-sm font-medium" 
                    >
                        {title}
                    </h3>
                ): title}
                <div className="h-px bg-transparent"/>
                {typeof subTitle === "string" ? (
                    <h3 className="w-full truncate text-xs">{subTitle}</h3>
                ): subTitle}
            </div>

            {!!rightWidget && (
                <span className={cx(widgetStyle, rightWidgetClassName)}>
                    {rightWidget}
                </span>
            )}
        </div>
    )
}

export const getWidgetSize = {
    "sm": "w-10 h-10",
    "md": "w-12 h-12",
    "lg": "w-14 h-14",
}