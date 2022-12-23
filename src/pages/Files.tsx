import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Files.scss"
import { Box } from "@mui/material";

const Files = () => {
    return (
        <div className={"files"}>
            <Sidebar />
            <div className="filesContainer">
                <Navbar />
                <Box>
                    files
                </Box>
            </div>
        </div>
    )
}

export default Files;