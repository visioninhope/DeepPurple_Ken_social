import { Card, CardContent, Typography, Box } from '@mui/material';

interface ChartInfoCardProps {

    data: {
        labelValues: number[],
        labelColor: string[],
    },
    infoCardOptions: {
        width: number,
        height: number,
    }

}

export default function ChartInfoCard({ data, infoCardOptions }: ChartInfoCardProps) {
    return (
        <Card sx={{ minWidth: infoCardOptions.width, minHeight: infoCardOptions.height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
                <Box display="flex" flexDirection="column" gap={5} alignItems="start" justifyContent="center" height="100%">
                    {data.labelValues.map((label, index) => (
                        <Box key={index} display="flex" flexDirection="row" gap={2} alignItems="center" justifyContent="center" height="100%">
                            <Box sx={{ width: 20, height: 20, bgcolor: data.labelColor[index] }} />
                            <Typography sx={{ fontSize: 15 }} component="div">
                                {label}%
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}