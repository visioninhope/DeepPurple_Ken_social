import { Button } from "@mui/material";
import SocialMediaPopUp from "../ui/SocialMediaPopup";
import SignOutButton from "../ui/SignOutButton";
import { axiosInstance } from "../../api/axios/config";

interface StreamTopBarProps {
    onToggleDisplayRightBar: () => void;
}

async function testSentiment() {
    const text = "@JasonBornue I am so happy that I am going to the beach today! Me and my friends are going to have a great time!";

    const sentiment = await axiosInstance.post('/analysis/getSentiment', {
        text: text
    }).then((response) => {
        return response.data;
    });

    const label = sentiment.scored_labels[0].label;
    console.log(label);
}

export default function StreamTopSideBar({ onToggleDisplayRightBar }: StreamTopBarProps) {
    return (
        <section className="px-5 py-4 mt-2 flex flex-col gap-5 justify-center border-b-2">

            <div className="flex flex-row justify-between">
                <p className="text-2xl font-bold">Twitter: Edward</p>
            </div>
            <div className="flex flex-row gap-5 items-center">
                <Button variant="contained" style={{ backgroundColor: "#877EFF" }}
                    onClick={onToggleDisplayRightBar}>
                    Add Stream
                </Button>
                <SocialMediaPopUp />
            </div>
        </section>
    )
}

