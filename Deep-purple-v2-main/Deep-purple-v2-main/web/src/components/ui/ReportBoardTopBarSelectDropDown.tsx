import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MyReportChartGroups } from '../../types';

interface ReportBoardTopBarSelectDropDownProps {
    Menuitems: MyReportChartGroups[] | undefined,
    HandleSelectChangeFunction: (groupname: string) => void,
}

export default function ReportBoardTopBarSelectDropDown({ Menuitems, HandleSelectChangeFunction }: ReportBoardTopBarSelectDropDownProps) {

    const [selectedGroup, setSelectedGroup] = React.useState<string>('');
    const [reportGroups, setReportGroups] = React.useState<MyReportChartGroups[]>();

    React.useEffect(() => {
        setReportGroups(Menuitems);
    }, [Menuitems, selectedGroup])

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setSelectedGroup(newValue);
        HandleSelectChangeFunction(newValue);
    };
    return (
        <div>
            <FormControl variant="outlined" sx={{
                width: 200,
                backgroundColor: 'white',
            }}>
                <InputLabel id="demo-simple-select-standard-label">select a report</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedGroup}
                    onChange={(event) => handleChange(event)}
                    label="Age"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {reportGroups?.map((reportGroup, index) => {
                        return (
                            <MenuItem key={index} value={reportGroup.accountName + " : " + reportGroup.report_group}>{reportGroup.accountName + " : " + reportGroup.report_group}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    )
}