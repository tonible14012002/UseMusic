import { PUBLIC_ROUTES } from "@/constants/routes"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useAuthSession = () => {
    const { data: session, ...rest} = useSession()
    const { push } = useRouter()

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            push(PUBLIC_ROUTES.LOGIN)
        }
    }, [session, push])

    return {
        session,
        ...rest
    }
}