import { HomeView } from "@/components/common/HomeView/HomeView"
import { DynamicSsgRoute } from "next/dist/build"

export interface HomePageSearchParam {
    [key: string]: string | string[] | undefined 
    album?: string
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
