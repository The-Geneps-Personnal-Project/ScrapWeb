import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Mangas from "./views/Mangas";
import Sites from "./views/Sites";
import { MangaProvider } from "./context/MangaContext";
import { SiteProvider } from "./context/SiteContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <Router>
            <MangaProvider>
                <SiteProvider>
                    <div className="bg-background-color min-h-screen flex flex-col relative">
                        <Header />
                        <div className="flex flex-1">
                            <Sidebar isCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />
                            <main
                                className={`bg-background-color ${isSidebarCollapsed ? "ml-16" : "ml-48"} mt-16 p-4 flex-1`}
                            >
                                <Routes>
                                    <Route path="/" element={<Mangas />} />
                                    <Route path="/mangas" element={<Mangas />} />
                                    <Route path="/sites" element={<Sites />} />
                                </Routes>
                            </main>
                        </div>
                        {isSidebarCollapsed && (
                            <button
                                onClick={toggleSidebar}
                                className="text-xl bg-sidebar-color text-white p-2 rounded fixed top-16 left-4 focus:outline-none z-20"
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        )}
                    </div>
                </SiteProvider>
            </MangaProvider>
        </Router>
    );
};

export default App;
