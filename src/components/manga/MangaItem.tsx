import React, { useState } from "react";
import { MangaInfo } from "../../types/types";

const MangaItem: React.FC<MangaInfo> = ({
    sites,
    anilist_id,
    chapter,
    alert,
    name,
    last_update,
    infos,
}) => {
    const defaultImage = "https://via.placeholder.com/128x192"
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    console.log(infos?.coverImage)

    return (
        <div className="bg-gray-700 text-white p-4 mb-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p className="text-m text-gray-300">Current Chapter: {chapter}</p>
                    <p className="text-m text-gray-300">Last Updated: {last_update}</p>
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
                            src={infos?.coverImage || defaultImage}
                            alt={`${name} Thumbnail`}
                            className="w-32 h-48 object-cover mr-4 rounded"
                        />
                        <div>
                            <p className="text-m text-gray-300 mb-2">{infos?.description}</p>
                            <div className="mb-4">
                                {infos?.tags.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-600 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                            <h4 className="text-lg font-medium">Sites</h4>
                            <ul className="list-disc list-inside">
                                {sites.length > 0 ? (
                                    sites.map((site, index) => (
                                        <li key={index} className="text-gray-300">
                                            {site.site}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-300">No sites</li>
                                )}
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
