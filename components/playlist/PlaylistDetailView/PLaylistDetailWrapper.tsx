"use client"

import { PropsWithChildren, createContext, useContext, useState } from "react"
import { Playlist } from "@/types/schema"
import cx from "classnames"

interface PlayListDetailWrapperProps extends PropsWithChildren {
    playlist: Playlist
    className?: string
}

interface PlayListDetailContext {
    playlistTitleOffsetY?: number
    playlist?: Playlist
    setPlaylistTitleRef: (ref: HTMLHeadingElement|null) => void
    headerBgVisible: boolean
    
}

const PlaylistWrapperContext = createContext<PlayListDetailContext>({
    setPlaylistTitleRef: () => {},
    headerBgVisible: false
})

export const usePlaylistDetailContext = () => useContext(PlaylistWrapperContext)

export const PlaylistDetailWrapper = ({ playlist, children, className, ...props }: PlayListDetailWrapperProps) => {

    const [ playlistTitleRef, setPlaylistTitleRef] = useState<HTMLHeadingElement|null>()
    const [ headerBgVisible, setHeaderBgVisible ] = useState<boolean>(false)

    const handleScroll = () => {
        const playlistTitleRect = playlistTitleRef?.getBoundingClientRect() ?? undefined
        if (playlistTitleRect !== undefined) {
            const titleOffsetY = playlistTitleRect.y

            if (titleOffsetY < 0) {
                // Header collide with the title => show background 
                setHeaderBgVisible(true)
            }
            else {
                setHeaderBgVisible(false)
            }
        }
    }

    return (
        <div className={cx(className, "relative flex h-full flex-col overflow-y-auto")}
            onScroll={handleScroll}
            {...props}
        >
            <PlaylistWrapperContext.Provider
                value={{
                    setPlaylistTitleRef,
                    headerBgVisible,
                    playlist
                }}
            >
                {children}
            </PlaylistWrapperContext.Provider>
        </div>
    )
}