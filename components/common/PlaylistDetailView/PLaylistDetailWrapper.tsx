"use client"

import { PropsWithChildren, createContext, useContext, useRef, useState } from "react"
import { Playlist } from "@/types/schema"
import { PLAYLIST_HEADER_HEIGHT } from "@/constants/config"

interface PlayListDetailWrapperProps extends PropsWithChildren {
    playlist: Playlist
}

interface PlayListDetailContext {
    playlistTitleOffsetY?: number
    playlist?: Playlist
    setPlaylistTitleRect: (rect: DOMRect) => void
    headerBgVisible: boolean
    
}

const PlaylistWrapperContext = createContext<PlayListDetailContext>({
    setPlaylistTitleRect: () => {},
    headerBgVisible: false
})
export const usePlaylistDetailContext = () => useContext(PlaylistWrapperContext)

export const PlaylistDetailWrapper = ({ playlist, children }: PlayListDetailWrapperProps) => {

    const [ playlistTitleRect, setPlaylistTitleRect] = useState<DOMRect>()
    const [ headerBgVisible, setHeaderBgVisible ] = useState<boolean>(false)

    const handleScroll = (e: any) => {
        const wrapper = e.target
        if (playlistTitleRect !== undefined) {
            const titleOffsetY = playlistTitleRect.y

            if (wrapper.scrollTop > titleOffsetY) {
                // Header collide with the title => show background 
                setHeaderBgVisible(true)
            }
            else {
                setHeaderBgVisible(false)
            }

        }
    }

    return (
        <div className="relative flex h-screen flex-col overflow-y-auto"
            onScroll={handleScroll}
        >
            <PlaylistWrapperContext.Provider
                value={{
                    setPlaylistTitleRect,
                    headerBgVisible,
                    playlist
                }}
            >
                {children}
            </PlaylistWrapperContext.Provider>
        </div>
    )
}