import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import "./Sidebar.scss"

const Sidebar = () => {
    return (
        <div className={"sidebar"}>
            <div className={"top"}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className={"logo"}>
                        Scraping service dashboard
                    </span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">BOTS</p>
                    <Link to="/bots" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Bots</span>
                        </li>
                    </Link>
                    <p className="title">LOGS</p>
                    <Link to="/logs" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Logs</span>
                        </li>
                    </Link>
                    <p className="title">FILES</p>
                    <Link to="/files" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Files</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className={"bottom"}>
                {/*TODO(miha): Here will be color switching done.*/}
                
            </div>
        </div>
    )
}

export default Sidebar;