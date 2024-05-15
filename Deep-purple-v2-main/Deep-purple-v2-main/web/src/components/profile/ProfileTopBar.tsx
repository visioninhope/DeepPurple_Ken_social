import SignOutButton from "../ui/SignOutButton";

interface ProfileTopBarProps {
    username: string;
}

export default function ProfileTopBar({ username }: ProfileTopBarProps) {
    return (
        <div className="py-9 mt-1 px-5 flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
                <p className="ml-2 text-2xl font-bold">Manage User Accounts</p>
            </div>
            <div><SignOutButton /></div>
        </div>
    )
}