import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import "./Bots.scss"
import ReactSearchBox from "react-search-box";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Config } from '../config';

// http://localhost:8080/v1/bots
const BOTS_URL:string = Config.BOTS_URL;

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


const Bots = () => {
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

    const handleId = (e:any) => {
        e.preventDefault();
        setId(e.target.value);
    };
    const handleName = (e:any) => {
        e.preventDefault();
        setName(e.target.value);
    };
    const handleFrom = (e:any) => {
        e.preventDefault();
        setFrom(e.target.value);
    };
    const handleTo = (e:any) => {
        e.preventDefault();
        setTo(e.target.value);
    };
    const handleMin = (e:any) => {
        e.preventDefault();
        setMin(e.target.value);
    };
    const handleMax = (e:any) => {
        e.preventDefault();
        setMax(e.target.value);
    };
    const handleSort = (e:any) => {
        e.preventDefault();
        setSort(e.target.value);
    };

    console.log("FROM BOTS");

    useEffect(() => {
        let interval = setInterval(() => {
            console.log("id:", id);
            fetch(BOTS_URL)
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
            }, 500);
            return () => {
                clearInterval(interval);
            };
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"bots"}>
                <Sidebar />
                <div className="botsContainer">
                    <Navbar />
                    <Box>
                        <label htmlFor="id">id: </label>
                        <input value={id} onChange={handleId} id="id" type="text"></input>

                        <label htmlFor="name">name: </label>
                        <input id="name" type="text"></input>
                        
                        <label htmlFor="from">from: </label>
                        <input id="from" type="date"></input>

                        <label htmlFor="to">to: </label>
                        <input id="to" type="date"></input>

                        <label htmlFor="min">min: </label>
                        <input id="min" type="number"></input>

                        <label htmlFor="max">max: </label>
                        <input id="max" type="number"></input>

                        <label htmlFor="sort">sort: </label>
                        <input id="sort" type="text"></input>
                    </Box>
                    <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Bot name</TableCell>
                                        <TableCell align="right">ID</TableCell>
                                        <TableCell align="right">date</TableCell>
                                        <TableCell align="right">logs count</TableCell>
                                        <TableCell align="right">status running</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.data.bots != null && items.data.bots.map((bot: Bot) => (
                                            <TableRow
                                                key={bot.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {bot.name}
                                                </TableCell>
                                                <TableCell align="right">{bot.id}</TableCell>
                                                <TableCell align="right">{bot.last_run.toString()}</TableCell>
                                                <TableCell align="right">{bot.logs_count}</TableCell>
                                                <TableCell align="right">{bot.status.running ? <p>running</p> : <p>not running</p>}</TableCell>
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

export default Bots;