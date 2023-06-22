import { SiteHeader } from "@/components/common/SiteHeader"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]/route"
import { redirect } from 'next/navigation'

import { PUBLIC_ROUTES } from "@/constants/routes"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(PUBLIC_ROUTES.LOGIN)
    return <div>Returnning to login</div>
  }
  return (
    <>
      <SiteHeader/>
      <div>

      </div>
    </>
  )
}
