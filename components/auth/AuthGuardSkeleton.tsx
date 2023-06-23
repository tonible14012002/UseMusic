import Image from "next/legacy/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export const AuthGuardSkeleton = () => {

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
            <div className="w-[400px] h-[200px] bg-slate-400">
                {/* <Image
                    height={200}
                    width={400}
                    layout="responsive"
                    alt="authenticating"
                    src="/imgs/Spotify_Logo_CMYK_Green.png"
                /> */}
            </div>
            <div className="flex items-center justify-center">
                <span className="h-10 w-10 animate-spin">
                    <FontAwesomeIcon icon={faSpinner} />
                </span>
            </div>
        </div>
    )
}