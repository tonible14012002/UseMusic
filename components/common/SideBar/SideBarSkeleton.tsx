"use client"

import { buttonVariants } from "@/components/ui/button"
import cx from "classnames"
import { Fragment } from "react"

export const SideBarSkeleton = () => {

    const ButtonSkeleton = (
        <div className={cx(buttonVariants({variant: "outline"}),"bg-secondary animate-pulse text-transparent border-none")}>
            <span>T</span>
        </div>
    )

    return (
        <header className="fixed inset-y-0 left-0 flex w-16 flex-1 animate-pulse flex-col items-center gap-4 border-r py-5">
            <Repeat
                Com={ButtonSkeleton}
                count={4}
            />
        </header>
    )
}

const Repeat = ({Com, count}: {Com: JSX.Element, count: number}) => {
    return Array(count).fill(null).map((_, index)=>(
        <Fragment key={index}>
            {Com}
        </Fragment>
    ))
}
