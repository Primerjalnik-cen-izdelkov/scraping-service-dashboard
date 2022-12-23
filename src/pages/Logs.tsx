import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import "./Logs.scss";

const Logs = () => {
    return (
        <div className={"logs"}>
            <Sidebar />
            <div className="logsContainer">
                <Navbar />
                <Box>
                    logs
                </Box>
            </div>
        </div>
    )
}

export default Logs;