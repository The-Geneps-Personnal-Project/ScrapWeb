import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Mangas from "views/Mangas";
// import Sites from "views/Sites";
import { MangaProvider } from "context/MangaContext";
import { SiteProvider } from "context/SiteContext";

const App: React.FC = () => {
    return (
        <Router>
            <MangaProvider>
                <SiteProvider>
                    <div className="bg-background-color min-h-screen flex flex-col relative">
                        <Header />
                        <div className="flex flex-1 mt-20">
                            <Routes>
                                <Route path="/" element={<Mangas />} />
                                {/* <Route path="/sites" element={<Sites />} /> */}
                            </Routes>
                        </div>
                    </div>
                </SiteProvider>
            </MangaProvider>
        </Router>
    );
};

export default App;
