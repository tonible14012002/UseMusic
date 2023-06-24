import { PUBLIC_ROUTES } from "@/constants/routes"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useAuthSession = () => {
    const { error, ...rest}: any = useSession()
    const { push } = useRouter()
    useEffect(() => {
        if (error === "RefreshAccessTokenError") {
            push(PUBLIC_ROUTES.LOGIN)
        }
    }, [error, push])
    return {
        ...rest
    }
}