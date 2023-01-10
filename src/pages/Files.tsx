import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Files.scss"
import { Box } from "@mui/material";
import {useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Config } from '../config';

const BOTS_URL:string = Config.BOTS_URL;
// http://localhost:8080/v1/bots/files
const FILES_URL:string = `${BOTS_URL}/files`;

interface File {
    id: number
    date: Date 
    bot_name: string
    file_name: string
}

function setQueryParams(qp:Map<string, string>) {
    var allEmpty = true;
    var queryParamsStr = ""
    for(const [key, value] of qp) {
        if(value === "") {
            console.log(`${key} is empty`);
        } else {
            console.log("HMMMM");
            allEmpty = false;
            queryParamsStr = queryParamsStr.concat(key, "=", value, "&");
        }
    }

    var result = FILES_URL;

    console.log("qp:", queryParamsStr);

    // construct URL if we have at least a value
    if(!allEmpty) {
        return result.concat("?", queryParamsStr);
    } else {
        return result
    }
}

var queryParams = new Map();

const Files = () => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any>([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [file, setFile] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        fetch(FILES_URL)
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
            ).catch(
                error => {console.log("error:", error);}
            )
    }, []);

    const update = () => {
        console.log(queryParams);
        console.log(name, sort);
        const qpURL = setQueryParams(queryParams);
        console.log(`qpURL:${qpURL}`);
        fetch(qpURL)
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
        ).catch(
            error => {console.log("error:", error);}
        )
    }

    const handleId = (e:any) => {
        e.preventDefault();
        setId(e.target.value);
        queryParams = queryParams.set('id', e.target.value);
        update();
    };
    const handleName = (e:any) => {
        e.preventDefault();
        setName(e.target.value);
        queryParams = queryParams.set('name', e.target.value);
        console.log("handleName:", e.target.value, sort, queryParams);
        update();
    };
    const handleFrom = (e:any) => {
        e.preventDefault();
        setFrom(e.target.value);
        var date = new Date(e.target.value);
        queryParams = queryParams.set('start_time.gt', `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);
        update();
    };
    const handleTo = (e:any) => {
        e.preventDefault();
        setTo(e.target.value);
        var date = new Date(e.target.value);
        queryParams = queryParams.set('start_time.lt', `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);
        update();
    };
    const handleFile = (e:any) => {
        e.preventDefault();
        setFile(e.target.value);
        queryParams = queryParams.set('file_name', e.target.value);
        update();
    };
    const handleSort = (e:any) => {
        e.preventDefault();
        setSort(e.target.value);
        queryParams = queryParams.set('sort', e.target.value);
        update();
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        console.log(items);
        return (
            <div className={"bots"}>
                <Sidebar />
                <div className="botsContainer">
                    <Navbar />
                    <Box>
                        <label htmlFor="id">id: </label>
                        <input value={id} onChange={handleId} id="id" type="text"></input>

                        <label htmlFor="name">name: </label>
                        <input value={name} onChange={handleName} id="name" type="text"></input>

                        <label htmlFor="min">file_name: </label>
                        <input value={file} onChange={handleFile} id="file" type="text"></input>
                        
                        <label htmlFor="from">from: </label>
                        <input value={from} onChange={handleFrom} id="from" type="date"></input>

                        <label htmlFor="to">to: </label>
                        <input value={to} onChange={handleTo} id="to" type="date"></input>

                        <label htmlFor="sort">sort: </label>
                        <input value={sort} onChange={handleSort} id="sort" type="text"></input>
                    </Box>
                    <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Bot name</TableCell>
                                        <TableCell align="right">ID</TableCell>
                                        <TableCell align="right">file name</TableCell>
                                        <TableCell align="right">date</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.data.files != null && items.data.files.map((file: File) => (
                                            <TableRow
                                                key={file.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {file.bot_name}
                                                </TableCell>
                                                <TableCell align="right">{file.id}</TableCell>
                                                <TableCell align="right"><a href={`${BOTS_URL}/${file.bot_name}/files/${file.file_name}`} target="_blank" download>{file.file_name}</a></TableCell>
                                                <TableCell align="right">{file.date.toString()}</TableCell>
                                                </TableRow>
                                        )) }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </Box>
                </div>
            </div>
        )
    }
}

export default Files;