import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface SiteItemProps {
    name: string;
    url: string;
    mangas: string[];
}

const SiteItem: React.FC<SiteItemProps> = ({ name, url, mangas }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-gray-700 p-4 mb-4 rounded shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl text-white font-semibold">{name}</h2>
                </div>
                <button
                    onClick={toggleExpand}
                    className="text-xl bg-gray-600 p-2 rounded focus:outline-none text-white"
                >
                    <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} />
                </button>
            </div>
            {isExpanded && (
                <div className="mt-4">
                    <p className="text-white">
                        URL:{" "}
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                            {url}
                        </a>
                    </p>
                    <p className="text-white">Mangas:</p>
                    <ul className="list-disc list-inside text-white">
                        {mangas.map((manga, index) => (
                            <li key={index}>{manga}</li>
                        ))}
                    </ul>
                    <div className="flex mt-4">
                        <button className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
                        <button className="bg-blue-500 text-white p-2 rounded">Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SiteItem;
