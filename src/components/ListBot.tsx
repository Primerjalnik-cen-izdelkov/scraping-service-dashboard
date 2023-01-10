import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useState, useEffect } from "react";
import "./ListBot.scss";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Config } from '../config';

const BOTS_URL:string = Config.BOTS_URL;

type ListBotProps = {
    name: string;
    last_run: string;
    logs_count: number;
    status: boolean;
};

const LOGS_URL:string = `${BOTS_URL}/logs`;
const FILES_URL:string = `${BOTS_URL}/files`;

async function handleStartFetch(name:string) {
    return fetch(`${BOTS_URL}/${name}/cmd/scrape`, {
        method: 'POST',
    }).then(data => data.json())
}

async function handleStopFetch(name:string) {
    return fetch(`${BOTS_URL}/${name}/cmd/stop`, {
        method: 'POST',
    }).then(data => data.json())
}

const ListBot = ({name, last_run, logs_count, status}: ListBotProps) => {
    const [cmdsOpen, setCmdsOpen] = useState(false)
    const [logsOpen, setLogsOpen] = useState(false)
    const [filesOpen, setFilesOpen] = useState(false)

    const [errorLR, setErrorLR] = useState<Error | null>(null);
    const [isLoadedLR, setIsLoadedLR] = useState(false);
    const [itemsLR, setItemsLR] = useState<any>([]);

    const [errorF, setErrorF] = useState<Error | null>(null);
    const [isLoadedF, setIsLoadedF] = useState(false);
    const [itemsF, setItemsF] = useState<any>([]);

    const handleCmdsClick = () => {
        setCmdsOpen(!cmdsOpen);
    };

    const handleLogsClick = () => {
        setLogsOpen(!logsOpen);
    };

    const handleFilesClick = () => {
        setFilesOpen(!filesOpen);
    };

    const handleStart = async (e:any) => {
        const data = await handleStartFetch(name);
        console.log("scrape: ", data);
        return data;
    };

    const handleStop = async (e:any) => {
        const data = await handleStopFetch(name);
        console.log("scrape: ", data);
        return data;
    };

    const date:Date = new Date(Date.parse(last_run));
    const dateStr = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

    useEffect(() => {
        fetch(`${LOGS_URL}?name=${name}&sort=-start_time&limit=1`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoadedLR(true);
                    setItemsLR(result);
                },
                (error) => {
                    setIsLoadedLR(false);
                    setErrorLR(error.message);
                }
            ).catch(
                error => {console.log("error:", error);}
            )
    }, [])

    useEffect(() => {
        fetch(`${FILES_URL}?name=${name}&sort=-start_time&limit=1`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoadedF(true);
                    setItemsF(result);
                },
                (error) => {
                    setIsLoadedF(false);
                    setErrorF(error.message);
                }
            ).catch(
                error => {console.log("error:", error);}
            )
    }, [])

    return (
        <List
            sx={{ bgcolog: `background.paper` }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-liist-subheader">
                </ListSubheader>
            }
            className="list"
        >
            <ListItem className="wrapper">
                <div className="left">
                    {name}
                </div>
                <div className="right">
                    <div className="rightItem">
                        {dateStr}
                    </div>
                    <div className="rightItem">
                        {status ? <p className="running">running</p> : <p className="not_running">not running</p>}
                    </div>
                </div>
            </ListItem>

            <ListItemButton className="wrapper" onClick={handleCmdsClick}>
                <ListItemIcon>
                    <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="Commands" />
                {cmdsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse className="wrapper" in={cmdsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={handleStart}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Start" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={handleStop}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Stop" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton className="wrapper" onClick={handleLogsClick}>
                <ListItemIcon>
                    <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="Last run log" />
                {logsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse className="wrapper" in={logsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                        {errorLR !== null && 
                            <p>error</p>
                        }
                        {isLoadedLR === true &&
                            <pre>{JSON.stringify(itemsLR, undefined, 2)}</pre>
                        }
                    {/**<ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Starredlogs" secondary="jhajaja\ndfas" />
                    </ListItemButton>
        */}
                </List>
            </Collapse>

            <ListItemButton className="wrapper" onClick={handleFilesClick}>
                <ListItemIcon>
                    <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="Last files" />
                {filesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse className="wrapper" in={filesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                        {errorF !== null && 
                            <p>error</p>
                        }
                        {isLoadedF === true &&
                            <pre>{JSON.stringify(itemsF, undefined, 2)}</pre>
                        }
                        {/**
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                    */}
                </List>
            </Collapse>

        </List>

    );
};

export default ListBot;