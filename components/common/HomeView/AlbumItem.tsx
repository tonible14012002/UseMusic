"use client"
import { Button } from "@/components/ui/button"
import { SimplifiedAlbum } from "@/types/spotify"
import Image from "next/image"

interface AlbumProps {
    allbum: SimplifiedAlbum
}

export const AlbumItem = ({allbum}: AlbumProps) => {

    return (
        <button className="flex flex-col transition-all hover:opacity-80"
            onClick={() => {console.log("click")}}
        >
            <div className="relative w-full overflow-hidden rounded-xl bg-secondary py-[50%]">
                <Image
                    alt={allbum.name}
                    fill
                    src={allbum.images[0].url}
                />
            </div>
            <h3 className="p-4 text-left font-medium">{allbum.name}</h3>
        </button>
    )
}