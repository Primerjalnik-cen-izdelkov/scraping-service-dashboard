import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/v1/bots"

interface Status {
    running: boolean
}

interface Bot {
    id: number
    name: string
    last_run: Date
    logs_count: number
    status: Status
}

const TableBots = () => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
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
            {items.data.bots.map((bot: Bot) => (
                    <TableRow key={bot.id}>
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
            {/**
            <ul>
                {items.data.bots.map((item: Bot) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
                */}
    </div>
        );
    }
};

export default TableBots;