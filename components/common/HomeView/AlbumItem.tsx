"use client"
import { SimplifiedAlbum } from "@/types/spotify"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

interface AlbumProps {
    album: SimplifiedAlbum
    isSelected: boolean
}

export const AlbumItem = ({album, isSelected}: AlbumProps) => {

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()

    const handleClick = () =>  {
        const params = new URLSearchParams(Array.from(searchParams.entries()))
        params.set("album", album.id)
        push(`${pathName}?${params.toString()}`)
    }

    return (
        <button className="my-2 flex flex-col transition-all hover:opacity-80 active:opacity-60"
            onClick={handleClick}
        >
            <div className="relative w-full overflow-hidden rounded-xl bg-secondary py-[50%]">
                {isSelected && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-secondary text-5xl opacity-40">
                        <FontAwesomeIcon icon={faPlay}/>
                    </div>
                )}
                <Image
                    alt={album.name}
                    fill
                    src={album.images[0].url}
                />
            </div>
            <h3 className="text-md mt-4 truncate px-2 text-left font-semibold">{album.name}</h3>
            <h3 className="mt-2 px-2 text-left text-xs opacity-70">{album.artists[0].name}</h3>
        </button>
    )
}