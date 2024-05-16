import React from "react";
import MangaList from "../components/manga/MangaList";

const Mangas: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-white mb-4"></h2>
            <MangaList />
        </div>
    );
};

export default Mangas;
