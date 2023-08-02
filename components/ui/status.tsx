interface StatusProps {
    status: string
}

export const Status: React.FC<StatusProps> = ({
    status
}) => {
    return (
        <p>{status}</p>
    )
}