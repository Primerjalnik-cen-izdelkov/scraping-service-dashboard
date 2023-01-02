import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import {useState, useEffect} from "react";
import "./Logs.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const API_URL = `http://localhost:8080/v1/bots/logs`

interface Log {
    id: number
    bot_name: string
    start_time: Date 
    downloader_request_count: number
    downloader_response_count: number
    downloader_response_status_count_404: number
    item_scraped_count: number
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

    var result = API_URL;

    console.log("qp:", queryParamsStr);

    // construct URL if we have at least a value
    if(!allEmpty) {
        return result.concat("?", queryParamsStr);
    } else {
        return result
    }
}

var queryParams = new Map();

const Logs = () => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any>([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [sort, setSort] = useState("");

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
    const handleMin = (e:any) => {
        e.preventDefault();
        setMin(e.target.value);
        queryParams = queryParams.set('item_scraped.gt', e.target.value);
        update();
    };
    const handleMax = (e:any) => {
        e.preventDefault();
        setMax(e.target.value);
        queryParams = queryParams.set('item_scraped.lt', e.target.value);
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
                        
                        <label htmlFor="from">from: </label>
                        <input value={from} onChange={handleFrom} id="from" type="date"></input>

                        <label htmlFor="to">to: </label>
                        <input value={to} onChange={handleTo} id="to" type="date"></input>

                        <label htmlFor="min">min: </label>
                        <input value={min} onChange={handleMin} id="min" type="number"></input>

                        <label htmlFor="max">max: </label>
                        <input value={max} onChange={handleMax} id="max" type="number"></input>

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
                                        <TableCell align="right">date</TableCell>
                                        <TableCell align="right">request count</TableCell>
                                        <TableCell align="right">response count</TableCell>
                                        <TableCell align="right">404 count</TableCell>
                                        <TableCell align="right">scraped count</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.data.scrape_logs != null && items.data.scrape_logs.map((log: Log) => (
                                            <TableRow
                                                key={log.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {log.bot_name}
                                                </TableCell>
                                                <TableCell align="right">{log.id}</TableCell>
                                                <TableCell align="right">{log.start_time.toString()}</TableCell>
                                                <TableCell align="right">{log.downloader_request_count}</TableCell>
                                                <TableCell align="right">{log.downloader_response_count}</TableCell>
                                                <TableCell align="right">{log.downloader_response_status_count_404}</TableCell>
                                                <TableCell align="right">{log.item_scraped_count}</TableCell>
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

export default Logs;