import { MyReports } from "../../types";
import InboxFeedback from "../ui/InboxFeedback";

interface InboxContentProps {
    replies: MyReports[]
}

export default function BugReportContent({ replies }: InboxContentProps) {
    return (
        <section>
            <div className="flex flex-col gap-5 justify-center items-start">
                {replies.map((reply, index) => (
                    <InboxFeedback key={index} reply={reply} />
                ))}
            </div>
        </section>
    )
}