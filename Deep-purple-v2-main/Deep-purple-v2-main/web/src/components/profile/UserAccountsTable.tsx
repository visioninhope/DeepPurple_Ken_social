import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function UserAccountsTable() {
    return (
        <TableContainer component={Paper} sx={{ background: '#3A3361' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontSize: '20px' }} align="left">Dessert (100g serving)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '20px' }} align="left">Calories</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '20px' }} align="left">Fat&nbsp;(g)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '20px' }} align="left">Carbs&nbsp;(g)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '20px' }} align="left">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='left' sx={{ color: 'white', fontSize: '20px' }} >
                                {row.name}
                            </TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '20px' }} >{row.calories}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '20px' }} >{row.fat}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '20px' }} >{row.carbs}</TableCell>
                            <TableCell align="left" sx={{ color: 'white', fontSize: '20px' }} >{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}