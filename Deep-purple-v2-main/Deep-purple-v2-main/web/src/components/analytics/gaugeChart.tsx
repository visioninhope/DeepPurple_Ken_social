import { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart'

interface ChartData {
    positivePercentage: number | undefined;
}

export default function MyGaugheChart({ positivePercentage }: ChartData) {

    const [positivePercentageState, setPositivePercentageState] = useState<number | undefined>(positivePercentage);

    const chartStyle = {
        textColor: 'black',
    }
    const colors = ["#008000", "#ADFF2F", "#FFFF00", "#FFA500", "#FF4500", "#FF0000"].reverse();

    useEffect(() => {
        if (positivePercentageState !== undefined) {
            setPositivePercentageState(0);
        }
        else {
            setPositivePercentageState(positivePercentage);
        }
    }, [positivePercentageState])
    return (
        <div style={{ width: '100%' }}>
            <GaugeChart id="gauge-chart4"
                nrOfLevels={7}
                arcPadding={0.1}
                cornerRadius={3}
                percent={positivePercentage}
                textColor='black'
                colors={colors}
            />
        </div>

    )
}