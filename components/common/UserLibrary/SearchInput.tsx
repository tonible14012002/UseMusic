"use client"

import React, { LegacyRef, useEffect, useState } from "react"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SEARCH_PARAM_KEYS } from "@/constants/enum"
import { useDebounce } from "@/hooks/useDebounce"

export const SearchInput = React.forwardRef(
    (props, ref: LegacyRef<HTMLInputElement>) => {
    
    const [ value, setValue ] = useState<string>("")
    const debouncedValue = useDebounce(value, 400)

    const pathName = usePathname()
    const { push } = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        if (!debouncedValue) {
            params.delete(SEARCH_PARAM_KEYS.USER_ITEMS)
        }
        else {
            params.set(SEARCH_PARAM_KEYS.USER_ITEMS, debouncedValue)
        }
        push(`${pathName}?${params.toString()}`)
    }, [debouncedValue, searchParams, pathName, push])

    return (
        <div className="relative flex h-10">
            <input
                {...props}
                id="search"
                ref={ref}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="h-full flex-1 rounded-lg bg-secondary p-2 pl-10 opacity-50 outline-none transition-all focus:opacity-100"
                maxLength={200}
            />
            <label htmlFor="search" className="absolute inset-y-0 left-0 flex h-10 w-10 items-center justify-center"
                // onClick={(e) => e.preventDefault()}
            >
                <FontAwesomeIcon icon={faSearch} />
            </label>
        </div>
    )
})