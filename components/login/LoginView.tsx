import { SpotifSignInButton } from "./SpotifySignInButton"

export const LoginView = () => {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
            <SpotifSignInButton/>
        </div>
    )
}