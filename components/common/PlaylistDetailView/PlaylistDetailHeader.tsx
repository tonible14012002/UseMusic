"use client"

import { Button } from "@/components/ui/button"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"

export const PlaylistDetailHeader = () => {
    const router = useRouter()

    return (
        <div className="flex">
            <div className="h-8">
                <Button size="sm"
                    className="rounded-full"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <Button size="sm"
                    variant="outline"
                    className="ml-3 rounded-full"
                    onClick={() => router.forward()}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>
        </div>
    )
}