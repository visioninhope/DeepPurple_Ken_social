import { useEffect, useState } from "react";
import SocialListeningContent from "../components/stream/SocialListeningContent"
import SocialListeningLeftBar from "../components/stream/SocialListeningLeftBar"
import { useParams } from "react-router-dom";
import { getStreamFromDBUsingUseremailAndDashBoadName } from "../api/appwrite/api";
import StreamTopSideBar from "../components/stream/StreamTopSideBar";
import { handleFetchUserAttributes } from "../context/AuthContext";
import EmptyStreamPage from "../components/stream/EmptyStreamPage";
import * as React from "react";

export default function Home() {


    const [displayAddStreamBar, setDisplayAddStreamBar] = useState(true);
    const [thisDashboardStream, setThisDashboardStream] = useState<string>('');

    function onToggleDisplayRightBar() {
        console.log("Toggle add stream : ", displayAddStreamBar);
        setDisplayAddStreamBar(!displayAddStreamBar);
    }

    const { dashboardname } = useParams<{ dashboardname: string }>();

    useEffect(() => {
        console.log("Dashboard name : ", dashboardname);
        if (dashboardname === undefined) {
            return;
        } else {
            const fetchStream = async () => {
                const email = await handleFetchUserAttributes();
                const streamName = await getStreamFromDBUsingUseremailAndDashBoadName(email, dashboardname);
                if (streamName === undefined) return;

            }
            fetchStream();
        }


    }, [dashboardname]);


    return (
        <div className="flex flex-row min-h-160">
            <SocialListeningLeftBar />
            <div className="flex-grow flex-col">

                {dashboardname !== undefined ? (
                    <>
                        <StreamTopSideBar onToggleDisplayRightBar={onToggleDisplayRightBar} />
                        <SocialListeningContent dashboardname={dashboardname ?? ""} displayAddStream={displayAddStreamBar}
                            onToggleDisplayRightBar={onToggleDisplayRightBar} />
                    </>
                )


                    : <EmptyStreamPage />}
            </div>


        </div>
    )
}
