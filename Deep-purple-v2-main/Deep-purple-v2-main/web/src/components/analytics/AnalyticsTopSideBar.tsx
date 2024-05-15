import SignOutButton from "../ui/SignOutButton";
import SwitchAccountDropDown from "../ui/SwitchAccountDropDown";

interface TopSidebarProps {
    title: string | undefined;
    onUsernameChange?: (value: string) => void;
}

export default function AnalyticsTopSidebar({ title, onUsernameChange }: TopSidebarProps) {
    return (
        <section>
            <div className="sticky py-2 top-0 z-50 bg-purple-2 w-full border-b-2">
                <div className="flex justify-between px-5 ">
                    <div className="flex flex-row gap-3 justify-center items-center">

                        <p className="font-bold text-3xl text-light-1">{title}</p>
                        <div className="sticky top-0 z-50 bg-purple-2 w-full px-5">
                            <div>
                                <SwitchAccountDropDown onUsernameChange={onUsernameChange} />
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </section>



    )
}