import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faGlobe, faBars, faList } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
    isCollapsed: boolean;
    onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleSidebar }) => {
    return (
        <div
            className={`bg-sidebar-color text-white h-screen p-4 fixed top-0 left-0 ${isCollapsed ? "w-16" : "w-48"} z-10 transition-width duration-300`}
        >
            <div className="flex flex-col items-center mb-6">
                {isCollapsed ? (
                    <button
                        onClick={onToggleSidebar}
                        className="text-xl bg-sidebar-color p-2 rounded focus:outline-none mt-16"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                ) : (
                    <>
                        <h1 className="text-xl mb-4 mt-16"></h1>
                        <button onClick={onToggleSidebar} className="bg-sidebar-color p-2 rounded focus:outline-none">
                            <FontAwesomeIcon icon={faList} />
                            <span className="ml-2">Close Sidebar</span>
                        </button>
                    </>
                )}
            </div>
            <nav className="mt-10">
                <ul>
                    <li className="mb-4 flex items-center justify-center">
                        <Link to="/" className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faBook} className="mr-2" />
                            {!isCollapsed && <span className="text-xl">Mangas</span>}
                        </Link>
                    </li>
                    <li className="flex items-center justify-center">
                        <Link to="/sites" className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                            {!isCollapsed && <span className="text-xl">Sites</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
