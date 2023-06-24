import { HomeView } from "@/components/common/HomeView/HomeView"
import { DynamicSsgRoute } from "next/dist/build"

interface HomePageProps {
  searchParams?: { 
    [key: string]: string | string[] | undefined 
  }
}

export default async function HomePage({
  searchParams
}: HomePageProps) {
  return <HomeView />
}
