import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/v1/bots/logs?limit=10&sort=-date"

interface Log {
    id: string
    start_time: Date
    bot_name: string
    item_scraped_count: number
    downloader_request_count: number
    downloader_response_count: number
    downloader_response_status_count_404: number
}

const TableFiles = () => {
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
                <TableCell className="tableCell">Items scraped</TableCell>
                <TableCell className="tableCell">Requests</TableCell>
                <TableCell className="tableCell">Responses</TableCell>
                <TableCell className="tableCell">404</TableCell>
                <TableCell className="tableCell">Date</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {items.data.scrape_logs.map((log: Log) => (
                    <TableRow key={log.id}>
                    <TableCell className="tableCell">{log.bot_name}</TableCell>
                    <TableCell className="tableCell">{log.item_scraped_count || 0}</TableCell>
                    <TableCell className="tableCell">{log.downloader_request_count}</TableCell>
                    <TableCell className="tableCell">{log.downloader_response_count}</TableCell>
                    <TableCell className="tableCell">{log.downloader_response_status_count_404}</TableCell>
                    <TableCell className="tableCell">{new Date(log.start_time).toISOString().substring(0, 10)}</TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
        </Table>
        </TableContainer>
            {/**
            <ul>
                {items.data.files.map((item: File) => (
                    <li key={item.id}>
                        {item.file_name}
                    </li>
                ))}
            </ul>
                */}
    </div>
        );
    }
};

export default TableFiles;