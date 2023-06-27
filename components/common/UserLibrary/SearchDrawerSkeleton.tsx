import { PlaylistRowItem } from "../PlaylistRowItem"
import { Repeat } from "../SideBar/SideBarSkeleton"
import { SearchInput } from "./SearchInput"

export const SearchDrawerSkeleton = () => {

    return (
        <>
            <div className="px-4">
                <SearchInput/>
            </div>

            <ul className="px-2 py-4">
                <Repeat
                    count={5}
                    renderer={() => (
                        <div className="rounded-md p-2 transition-all hover:bg-secondary">
                        <div className="flex h-12 w-full items-center text-left ">
                            <div className="h-12 w-12 animate-pulse rounded-md bg-secondary"/>
                            <div className="ml-2 h-full w-full grow animate-pulse overflow-hidden rounded-md bg-secondary"/>
                        </div>
                    </div> 
                    )}
                />
            </ul>
        </>
    )
}