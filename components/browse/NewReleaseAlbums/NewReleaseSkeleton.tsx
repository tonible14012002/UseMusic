"use client"
import { Repeat } from "../../common/SideBar/SideBarSkeleton"

export const NewReleaseSkeleton = () => {

    return (
        <div className="flex h-screen flex-col p-8">
            <h3 className="max-w-[200px] text-4xl font-bold">
                Discover New Music
            </h3>
            <div className="mt-10 flex flex-1 flex-col overflow-y-auto">
                <h3 className="mb-6 w-fit animate-pulse rounded-md bg-secondary text-2xl font-medium text-transparent">New-Release</h3>
                <div className="grid grid-cols-5 gap-8">
                    <Repeat
                        count={10}
                        renderer={()=>(
                            <div className="flex animate-pulse flex-col">
                                <div className="relative w-full overflow-hidden rounded-xl bg-secondary py-[50%]">
                                </div>
                                <h3 className="p-4 font-medium text-transparent">Temp</h3>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}