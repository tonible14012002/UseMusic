import { HomeView } from "@/components/common/HomeView/HomeView"
import { SideBar } from "@/components/common/SideBar"

export default async function IndexPage() {
  return (
    <div className="flex w-full flex-1">
      <SideBar/>
      <HomeView/>
    </div>
  )
}
