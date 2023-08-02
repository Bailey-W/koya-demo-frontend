export default function AuthLayout( {
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center mx-auto h-full w-full justify-center bg-slate-800">
            {children}
        </div>
    )
}