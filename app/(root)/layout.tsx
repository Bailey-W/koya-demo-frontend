import NavBar from "@/components/navbar"

export default function AuthLayout( {
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <NavBar />
            <div className="max-w-screen-xl mx-auto">
                {children}
            </div>
        </div>
    )
}