import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/v1/bots/files?limit=10&sort=-date"

interface File {
    id: string
    date: Date
    bot_name: string
    file_name: string
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
                <TableCell className="tableCell">File date</TableCell>
                <TableCell className="tableCell">File name</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {items.data.files.map((file: File) => (
                    <TableRow key={file.id}>
                    <TableCell className="tableCell">{file.bot_name}</TableCell>
                    <TableCell className="tableCell">{new Date(file.date).toISOString().substring(0, 10)}</TableCell>
                    <TableCell className="tableCell">{file.file_name}</TableCell>
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