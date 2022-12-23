import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useState } from "react";
import "./ListBot.scss";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

type ListBotProps = {
    name: string;
};

const ListBot = ({name}: ListBotProps) => {
    const [cmdsOpen, setCmdsOpen] = useState(false)
    const [logsOpen, setLogsOpen] = useState(false)
    const [filesOpen, setFilesOpen] = useState(false)

    const handleCmdsClick = () => {
        setCmdsOpen(!cmdsOpen);
    };

    const handleLogsClick = () => {
        setLogsOpen(!logsOpen);
    };

    const handleFilesClick = () => {
        setFilesOpen(!filesOpen);
    };


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
                        10.2.2022
                    </div>
                    <div className="rightItem">
                        status
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
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Start" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
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
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
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
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>

        </List>

    );
};

export default ListBot;