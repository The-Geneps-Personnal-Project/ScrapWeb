import React, { useState } from "react";
import { MangaInfo } from "types/types";
import { useMangaContext } from "context/MangaContext";
import { EditMangaModal } from "./MangaPopup";

const MangaItem: React.FC<MangaInfo> = ({
    id,
    sites,
    anilist_id,
    chapter,
    alert,
    name,
    last_update,
    infos,
    onDelete,
    onEdit,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { updateManga, updateMangaSites, deleteManga } = useMangaContext();

    const defaultImage = "https://via.placeholder.com/128x192";

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleDeleteClick = () => {
        deleteManga(name);
        onDelete && onDelete({ sites, anilist_id, chapter, alert, name, last_update, infos } as MangaInfo);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = (updatedManga: MangaInfo) => {
        if (sites.length !== updatedManga.sites.length) updateMangaSites(name, sites, updatedManga.sites);
        updateManga(updatedManga);
        onEdit && onEdit(updatedManga);
    };

    const isImageAvailable = (url: string) => {
        return url && url !== "" ? url : defaultImage;
    };

    const isAlert = (alert: number) => {
        return alert ? " ON" : " OFF";
    };

    return (
        <div className="bg-gray-700 text-white p-4 mb-4 rounded-lg flex relative">
            <div className="flex-shrink-0 mr-4">
                <div className="relative">
                    <img
                        src={isImageAvailable(infos?.coverImage?.large!)}
                        alt={`${name} Thumbnail`}
                        className="w-full h-full object-cover rounded"
                    />
                </div>
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <div className="flex-grow text-left flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-4">{name}</h3>
                        <div className="flex items-center mb-4">
                            <span className="bg-gray-600 text-white text-xs font-semibold mr-2 px-3 py-2 rounded">
                                Current Chapter: {chapter}
                            </span>
                            <span className="bg-gray-600 text-white text-xs font-semibold mr-2 px-3 py-2 rounded">
                                Last Updated: {last_update || "No datas"}
                            </span>
                            <span className="bg-gray-600 text-white text-xs font-semibold mr-2 px-3 py-2 rounded">
                                Alert:
                                <span className={`${isAlert(alert) === " ON" ? "text-green-500" : "text-red-600"}`}>
                                    {isAlert(alert)}
                                </span>
                            </span>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://anilist.co/manga/${anilist_id}/${name.replaceAll(" ", "-")}`}
                            >
                                <img src="anilist.png" alt="anilist" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-m text-gray-300 mb-2">{infos?.description}</p>
                    <h4 className="text-sm font-medium">Tags</h4>
                    <div className="mb-4">
                        {infos?.tags?.map((genre, index) => (
                            <span
                                key={index}
                                className="bg-gray-600 text-gray-300 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <h4 className="text-sm font-medium">Sites</h4>
                    <div className="mb-4">
                        {sites.length > 0 ? (
                            sites.map((site, index) => (
                                <a
                                    key={index}
                                    href={site.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-600 text-gray-300 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                                >
                                    {site.site}
                                </a>
                            ))
                        ) : (
                            <span className="bg-gray-600 text-gray-300 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                                No sites
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-4">
                <button
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300"
                    onClick={handleDeleteClick}
                >
                    Delete
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300"
                    onClick={handleEditClick}
                >
                    Edit
                </button>
            </div>
            {isModalOpen && (
                <EditMangaModal
                    manga={{ id, sites, anilist_id, chapter, alert, name, last_update, infos }}
                    onClose={handleModalClose}
                    onSave={handleSave}
                    isOpen={isModalOpen}
                />
            )}
        </div>
    );
};

export default MangaItem;
