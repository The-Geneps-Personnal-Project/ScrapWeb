import React, { useState } from "react";

interface MangaItemProps {
    title: string;
    currentChapter: number;
    lastUpdated: string;
    sites: string[];
    thumbnail: string;
    description: string;
    genres: string[];
}

const MangaItem: React.FC<MangaItemProps> = ({
    title,
    currentChapter,
    lastUpdated,
    sites,
    thumbnail,
    description,
    genres,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-gray-700 text-white p-4 mb-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-300">Current Chapter: {currentChapter}</p>
                    <p className="text-sm text-gray-300">Last Updated: {lastUpdated}</p>
                </div>
                <button
                    onClick={toggleExpand}
                    className="text-xl bg-gray-600 hover:bg-gray-500 p-2 rounded focus:outline-none transition-colors duration-300"
                >
                    {isExpanded ? "-" : "+"}
                </button>
            </div>
            {isExpanded && (
                <div className="mt-4">
                    <div className="flex">
                        <img
                            src={thumbnail}
                            alt={`${title} Thumbnail`}
                            className="w-32 h-48 object-cover mr-4 rounded"
                        />
                        <div>
                            <p className="text-sm text-gray-300 mb-2">{description}</p>
                            <div className="mb-4">
                                {genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-600 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            <h4 className="text-lg font-medium">Sites</h4>
                            <ul className="list-disc list-inside">
                                {sites.map((site, index) => (
                                    <li key={index} className="text-gray-300">
                                        {site}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 flex">
                                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300">
                                    Delete
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-4 transition-colors duration-300">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MangaItem;
