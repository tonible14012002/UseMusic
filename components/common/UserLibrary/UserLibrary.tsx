import { CategorySlider } from "./CategorySlider"
import { SearchDrawer } from "./SearchDrawer"

export const UserLibrary = async () => {

    console.log("Render User LIBRARAY")
    return (
        <div className="flex h-screen flex-col border-r py-4">
            <h3 className="max-w-[200px] px-4 text-2xl font-bold">
                Your Library
            </h3>
            <div className="mt-4 px-4">
                { /* @ts-expect-error Server Component */ }
                <CategorySlider/>
            </div>
            <div className="flex-1 overflow-y-auto py-4 pb-8 pt-0">
                <SearchDrawer/>
            </div>
        </div>
    )
}