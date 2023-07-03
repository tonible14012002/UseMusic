"use client"

import { Button } from "@/components/ui/button"
import { faChevronLeft, faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { usePlaylistDetailContext } from "./PLaylistDetailWrapper"
import cx from "classnames"

export const PlaylistDetailHeader = () => {
    const router = useRouter()
    const { playlist, headerBgVisible } = usePlaylistDetailContext()

    return (
        <div
            className={cx(
                "px-8 sticky top-0 z-20 flex h-16 items-center transition duration-600", {
                    "bg-secondary border-b": headerBgVisible
                }
            )}
        >
            <div className="flex h-16 items-center">
                <Button size="sm"
                    className="rounded-full"
                    // variant="outline"
                    onClick={() => router.back()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <Button size="sm"
                    // variant="outline"
                    className="ml-3 rounded-full"
                    onClick={() => router.forward()}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>
            <div 
                className={cx(
                    "ml-4 hidden", {
                        "!block": headerBgVisible
                    }
                )}
            >
                <Button size="lg" className="rounded-full text-xl">
                    <FontAwesomeIcon icon={faPlay} />
                </Button>
            </div>
            <h3
                className={cx(
                    "ml-4 text-xl font-semibold transition duration-600 hidden", {
                        "!block": headerBgVisible
                    }
                )}
            >
                {playlist?.name}
            </h3>
        </div>
    )
}