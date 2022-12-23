import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

interface Status {
    running: boolean
}

interface Bot {
    name: string
    last_run: Date
    logs_count: number
    status: Status
}

interface ListProps {
    url: string
}

const List = ({url}:ListProps) => {
    const [data, setData] = useState<Bot[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(
                    url
                );

                if(!response.ok) {
                    throw new Error(
                        `this is an http error: the status is ${response.status}`
                    );
                }
                let responseData = await response.json();
                setData(responseData);
                setError(null);
            } catch(err) {
                if(err instanceof Error) {
                    setError(err.message);
                }
                setData(null);
            } finally  {
                setLoading(false);
            }
        }
        getData() 
    }, [])

  return (
    <div>
        <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell className="tableCell">Bot name</TableCell>
                <TableCell className="tableCell">Log count</TableCell>
                <TableCell className="tableCell">Last run</TableCell>
                <TableCell className="tableCell">Running</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {loading && <div>Loading data...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data &&
                data.data.bots.map((bot: Bot) => (
                    <TableRow key={bot.name}>
                    <TableCell className="tableCell">{bot.name}</TableCell>
                    <TableCell className="tableCell">{bot.logs_count}</TableCell>
                    <TableCell className="tableCell">{bot.last_run.toString()}</TableCell>
                    <TableCell className="tableCell">
                        <span className={`status ${bot.status.running}`}>{bot.status.running.toString()}</span>
                    </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
};

export default List;