import SignOutButton from "../ui/SignOutButton";
import SwitchAccountDropDown from "../ui/SwitchAccountDropDown";

interface InboxTopBarProps {
    onUsernameChange: (value: string) => void;
}

export default function BugReportTopBar({ onUsernameChange }: InboxTopBarProps) {

    function handleUsernameChange(value: string) {
        onUsernameChange(value);
    }

    return (
        <section className="py-9 mt-1 px-10">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="ml-2 text-2xl font-bold">Techical Bug Reports</p>

                </div>
                <div><SignOutButton /></div>
            </div>
        </section>
    )
}