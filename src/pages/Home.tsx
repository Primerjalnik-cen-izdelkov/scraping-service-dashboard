import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TableBots from "../components/TableBots";
import TableFiles from "../components/TableFiles";
import TableLogs from "../components/TableLogs";
import ListBot from "../components/ListBot";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import "./Home.scss"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = 'http://localhost:8080/v1/bots';

interface Status {
    running: boolean
}

interface Bot {
    id: number
    name: string
    last_run: string
    logs_count: number
    status: Status
}

async function runAllBotsFetch() {
    return fetch('http://localhost:8080/v1/bots/cmd/scrape', {
        method: 'POST',
    }).then(data => data.json())
}

async function stopAllBotsFetch() {
    return fetch('http://localhost:8080/v1/bots/cmd/stop', {
        method: 'POST',
    }).then(data => data.json())
}

const Home = () => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any>([]);

    const runAllBots = async (e:any) => {
        const data = await runAllBotsFetch();
        console.log("scrape: ", data);
        return data;
    }

    const stopAllBots = async (e:any) => {
        const data = await stopAllBotsFetch();
        console.log("stop: ", data);
        return data;
    }

    useEffect(() => {
        let interval = setInterval(() => {
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
            <div className={"home"}>
                <Sidebar />
                <div className={"homeContainer"}>
                    <Navbar />
                    <div className={"listContainer"}>
                        {/**
                        <Link to="/bots" style={{ textDecoration: "none" }}>
                            <div className={"listTitle"}>Bots</div>
                        </Link>
                        <TableBots />

                        <Link to="/files" style={{ textDecoration: "none" }}>
                            <div className={"listTitle"}>Files</div>
                        </Link>
                        <TableFiles />

                        <Link to="/logs" style={{ textDecoration: "none" }}>
                            <div className={"listTitle"}>Logs</div>
                        </Link>
                        <TableLogs />
                        */}

                        <h2>All bots commands</h2>
                        <ListItemButton onClick={runAllBots}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary="Run all bots" />
                        </ListItemButton>
                        <ListItemButton onClick={stopAllBots}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary="Stop all bots" />
                        </ListItemButton>

                        <h2>Bots</h2>

                        {items.data.bots.map((bot: Bot) => (
                            <ListBot key={bot.id} name={bot.name} last_run={bot.last_run} logs_count={bot.logs_count} status={bot.status.running} />
                        )) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;