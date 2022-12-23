import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TableBots from "../components/TableBots";
import TableFiles from "../components/TableFiles";
import TableLogs from "../components/TableLogs";
import ListBot from "../components/ListBot";
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
    last_run: Date
    logs_count: number
    status: Status
}

const Home = () => {
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
            ).catch(
                error => {console.log("moj error:", error);}
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        console.log(items);
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

                        <h2>Bots</h2>

                        {items.data.bots.map((bot: Bot) => (
                            <ListBot key={bot.id} name={bot.name}/>
                        ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;