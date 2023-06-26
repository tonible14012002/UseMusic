"use client"

import React, { LegacyRef } from "react"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { buttonVariants } from "@/components/ui/button"
import cx from "classnames"

export const SearchInput = React.forwardRef(
    (props, ref: LegacyRef<HTMLInputElement>) => {
    return (
        <div className="relative flex h-10">
            <input
                ref={ref}
                className="h-full flex-1 rounded-lg bg-secondary p-2 pl-10 opacity-50 outline-none transition-all focus:opacity-100"
            />
            <div className="absolute inset-y-0 left-0 flex h-10 w-10 items-center justify-center"
                // onClick={(e) => e.preventDefault()}
            >
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    )
})