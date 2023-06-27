import { SearchInput } from "./SearchInput"
import { UserPlaylistsResponse } from "@/types/schema"
import { PlaylistRowItem } from "../PlaylistRowItem"
import { BaseResponse } from "@/lib/fetcher"

interface SearchDrawerProps {
    playlistsFetching: Promise<BaseResponse<UserPlaylistsResponse>>
}

export const SearchDrawer = async ({ playlistsFetching }: SearchDrawerProps) => {

    const { data: userPlaylists } = await playlistsFetching
    const { items } = userPlaylists

    return (
        <>
            <div className="px-4">
                <SearchInput/>
            </div>

            <ul className="px-2 py-4">
                {items.map(item => (
                    <PlaylistRowItem
                        key={item.id}
                        playlist={item}
                    />
                ))}
                {items.map(item => (
                    <PlaylistRowItem
                        key={item.id}
                        playlist={item}
                    />
                ))}
            </ul>
        </>
    )
}