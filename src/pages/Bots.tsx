import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import "./Bots.scss"

const Bots = () => {
    return (
        <div className={"bots"}>
            <Sidebar />
            <div className="botsContainer">
                <Navbar />
                <Box>
                    bots 
                </Box>
            </div>
        </div>
    )
}

export default Bots;