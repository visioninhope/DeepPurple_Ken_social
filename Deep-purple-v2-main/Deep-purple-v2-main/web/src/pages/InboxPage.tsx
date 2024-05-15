import { useEffect, useState } from "react";
import InboxContent from "../components/inbox/InboxContent";
import InboxLeftSideBar from "../components/inbox/InboxLeftSideBar";
import InboxTopBar from "../components/inbox/InboxTopBar";
import { MyUserReplies } from "../types";
import { getRepliesToThatAuthor } from "../api/appwrite/api";

export default function InboxPage() {

    const [accountName, setAccountName] = useState<string>("");
    const [replies, setReplies] = useState<MyUserReplies[]>([]);

    function handleUsernameChange(value: string) {
        setAccountName(value);
    }

    async function getReplies() {
        const replies = await getRepliesToThatAuthor(accountName, 30);

        if (replies === undefined || replies.total === 0) {
            return;
        }

        const data: MyUserReplies[] = replies?.documents.map(reply => ({
            author: reply.author,
            reply_text: reply.reply_text,
            replied_to: reply.replied_to,
            sentiment: reply.sentiment,
            emotion: reply.emotion,
            author_replied_to: reply.author_replied_to,
        }));


        return data;
    }

    useEffect(() => {
        const fetchReplies = async () => {
            const replies = await getReplies();
            if (replies === undefined) return;
            setReplies(replies);
            console.log(replies);
        }
        fetchReplies();

    }, [accountName]);

    return (
        <section className="flex flex-row min-h-screen">
            <div className="border-r-2">
                <InboxLeftSideBar />
            </div>
            <div className="flex flex-col w-full">
                <div className="border-b-2 ">
                    <InboxTopBar onUsernameChange={handleUsernameChange} />
                </div>
                <div className="m-5">
                    <InboxContent replies={replies} />
                </div>
            </div>
        </section>
    )
}