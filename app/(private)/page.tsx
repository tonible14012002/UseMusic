import { HomeView } from "@/components/common/HomeView/HomeView"
import { BaseSearchParam } from "@/types/schema"

export interface HomePageSearchParam extends BaseSearchParam{
    album?: string
    user_items?: string
}
export interface HomePageProps {
  searchParams?: HomePageSearchParam
}

export default async function HomePage({
  searchParams
}: HomePageProps) {
  /* @ts-expect-error Server Component */
  return <HomeView params={searchParams} />
}
