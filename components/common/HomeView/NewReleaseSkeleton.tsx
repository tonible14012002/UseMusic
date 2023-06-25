"use client"
import { Repeat } from "../SideBar/SideBarSkeleton"

export const NewReleaseSkeleton = () => {

    return (
        <div>
            <h3 className="mb-6 w-fit bg-secondary text-2xl font-medium text-transparent">New-Release</h3>
            <div className="grid grid-cols-3 gap-8">
                <Repeat
                    count={10}
                    renderer={()=>(
                        <div className="flex flex-col">
                            <div className="relative w-full overflow-hidden rounded-xl bg-secondary py-[50%]">
                            </div>
                            <h3 className="p-4 font-medium text-transparent">Temp</h3>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}