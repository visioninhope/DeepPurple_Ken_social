import SignOutButton from "../ui/SignOutButton";
import SwitchAccountDropDown from "../ui/SwitchAccountDropDown";

interface InboxTopBarProps {
    onUsernameChange: (value: string) => void;
}

export default function InboxTopBar({ onUsernameChange }: InboxTopBarProps) {

    function handleUsernameChange(value: string) {
        onUsernameChange(value);
    }

    return (
        <section className="py-2 px-10">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="ml-2 text-2xl font-bold">Customer Feedbacks</p>
                    <SwitchAccountDropDown onUsernameChange={handleUsernameChange} />
                </div>
                <div><SignOutButton /></div>
            </div>
        </section>
    )
}