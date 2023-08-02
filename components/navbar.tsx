import { UserButton } from "@clerk/nextjs"
import { Navigation } from "@/components/navigation";

const NavBar = () => {
    return (
        <div className="border-b">
            <div className="flex px-4 items-center h-16 max-w-screen-xl mx-auto">
                <p className="text-3xl font-extrabold">Koya</p>
                <Navigation className="mx-12"/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default NavBar;