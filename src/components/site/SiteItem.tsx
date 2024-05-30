import React, { useState } from "react";

interface SiteItemProps {
    name: string;
    url: string;
    mangas: string[];
}

const SiteItem: React.FC<SiteItemProps> = ({ name, url, mangas }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const mangasPerPage = 24; // 3 rows x 8 columns

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const paginatedMangas = mangas.slice((currentPage - 1) * mangasPerPage, currentPage * mangasPerPage);

    return (
        <div className="bg-gray-700 p-4 mb-4 rounded-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">
                        <a href={url} target="_blank" className="text-blue-500">
                            {name}
                        </a>
                    </h2>
                    {isExpanded && (
                        <div className="mt-4 p-4 flex justify-center text-white">
                            <div>
                                <p className="mb-4 text-xl text-center">{mangas.length} mangas</p>
                                <div className="border border-gray-500 p-4 rounded-lg">
                                    <div className="grid grid-cols-8 gap-4">
                                        {paginatedMangas.map((manga, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-800 p-2 rounded text-center text-white overflow-hidden text-ellipsis whitespace-nowrap"
                                                title={manga}
                                            >
                                                {manga.length > 10 ? `${manga.slice(0, 10)}...` : manga}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <button
                    className="text-xl bg-sidebar-color p-2 rounded focus:outline-none text-white"
                    onClick={toggleExpand}
                >
                    {isExpanded ? "-" : "+"}
                </button>
            </div>
            {isExpanded && (
                <>
                    <div className="flex justify-between mt-4">
                        <div className="flex justify-center">
                            {Array.from({ length: Math.ceil(mangas.length / mangasPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SiteItem;
