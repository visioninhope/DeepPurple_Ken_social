import { useEffect, useState } from 'react';
import Stream from '../ui/Stream';
import StreamContentRightBar from './StreamContentRightBar';
import { getStreamFromDBUsingUseremailAndDashBoadName, updateDashboardStream } from '../../api/appwrite/api';
import { handleFetchUserAttributes } from '../../context/AuthContext';

interface SocialListeningContentProps {
    dashboardname: string;
    displayAddStream: boolean;
    onToggleDisplayRightBar: () => void;
}

export default function SocialListeningContent({ dashboardname, displayAddStream, onToggleDisplayRightBar }: SocialListeningContentProps) {


    const [accountName, setAccountName] = useState<string>('');
    const [displayStream, setdisplayStream] = useState(false);


    async function addStream(username: string) {

        const email = await handleFetchUserAttributes();
        const stream = username;

        updateDashboardStream(email, dashboardname, stream);
        setAccountName(username);


    }

    useEffect(() => {

        const fetchStream = async () => {
            const email = await handleFetchUserAttributes();
            const stream = await getStreamFromDBUsingUseremailAndDashBoadName(email, dashboardname);
            if (stream === undefined || stream.documents[0].stream === '') {
                setAccountName('');
                setdisplayStream(false);
            } else {
                setAccountName(stream.documents[0].stream);
            };

        };
        fetchStream();

        if (accountName !== '') {

            setdisplayStream(true);
        }
    }, [dashboardname, accountName]);

    const handleStream = (value: string) => {
        if (value === 'delete') {
            setdisplayStream(false);
            setAccountName('');
        }
    };

    return (

        <section className="flex ">
            <div className='flex-grow max-w-[600px]'>
                {displayStream ? (
                    <Stream username={accountName} onValueReturn={handleStream} />
                ) : (
                    <div className="flex flex-col justify-center items-center min-h-[650px] w-full">
                        <div className="py-5">
                            <img src="/src/assets/icons/EmptyReportBoardIcon.svg" alt="emptyPage"
                                className="invert-white" />
                        </div>
                        <div className="flex flex-col gap-5 items-center justify-center">
                            <p className="font-bold text-md">Add a stream to get live feeds from your account</p>

                        </div>
                    </div>
                )}
            </div>
            {displayAddStream && (
                <StreamContentRightBar addStream={addStream} onToggleDisplayRightBar={onToggleDisplayRightBar} />
            )}
        </section>


    )
}

