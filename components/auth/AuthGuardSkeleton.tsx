import Image from "next/legacy/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export const AuthGuardSkeleton = () => {

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
            <Image
                height={120}
                width={400}
                alt="authenticating"
                src="/imgs/Spotify_Logo_CMYK_Green.png"
                sizes="(max-width: 100px), 100px, 100px"
            />
            <div className="flex items-center justify-center">
                <span className="h-fit w-fit animate-spin items-center">
                    <FontAwesomeIcon icon={faSpinner} />
                </span>
            </div>
        </div>
    )
}