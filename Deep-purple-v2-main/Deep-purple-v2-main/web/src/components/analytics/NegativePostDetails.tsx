import { Button } from "@aws-amplify/ui-react"
import { Tweet } from "react-tweet"
import { MySentimentTableData } from "../../types";
import { useEffect, useState } from "react";
import { getSentimentTableOfThatPost } from "../../services";

interface NegativePostDetailsProps {
    postId: string;
}

export default function NegativePostDetails({ postId }: NegativePostDetailsProps) {

    const [postData, setPostData] = useState<MySentimentTableData>();

    useEffect(() => {
        const fetchPostData = async () => {
            const data = await getSentimentTableOfThatPost(postId);
            if (data === undefined) return;
            setPostData(data[0]);
            console.log(data[0]);
        }
        fetchPostData();
    }, [postId]);

    return (
        <section className="py-10 px-5 mt-10 bg-purple-1 rounded-2xl">
            <div className="grid grid-cols-2 justify-center border-b-2">
                <div className="light max-w-fit">
                    <Tweet id={postId} />
                </div>
                <div>
                    <div className="py-10 pl-10 flex flex-row gap-24 border-b-2">
                        <div className="flex flex-col gap-10 text-start ">
                            <p>ID</p>
                            <p>Negativity Scale</p>
                            <p>Platform</p>
                            <p>Date Posted</p>
                            <p>Link to Post</p>
                            <p>Status</p>
                        </div>
                        <div className="flex flex-col gap-10 text-start">
                            <p>{postId}</p>
                            <p>Negativity Scale</p>
                            <p>Platform</p>
                            <p>Date Posted</p>
                            <p>Link to Post</p>
                            <p>Status</p>
                        </div>
                    </div>
                    <div className="mt-5 pl-10 flex flex-row gap-20 justify-start items-center">
                        <Button className="text-light-1 bg-primary-600">
                            Export
                        </Button>
                        <Button className="text-light-1 bg-primary-600">
                            Report
                        </Button>
                        <Button className="text-light-1 bg-primary-600">
                            Suspend
                        </Button>
                    </div>
                </div>


            </div>


        </section>
    )
}

