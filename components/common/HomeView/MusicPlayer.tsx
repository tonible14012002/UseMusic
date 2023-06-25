"use client"

export const MusicPlayer = () => {

    return (
        <div className="flex h-screen w-full flex-col items-center border-x py-8">
            <h3 className="text-lg font-medium">Now Playing</h3>
            <div className="mt-16 h-[300px] w-[300px] bg-secondary">
            </div>
            <h3></h3>
        </div>
    )
}