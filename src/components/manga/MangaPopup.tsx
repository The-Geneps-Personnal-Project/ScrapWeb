import React, { useEffect, useState } from "react";
import { MangaInfo, SiteInfo, EditMangaModalProps } from "types/types";
import { getAllSites } from "services/sites";
import Modal from "../Modal";

export const EditMangaModal: React.FC<EditMangaModalProps> = ({ isOpen, manga, onClose, onSave }) => {
    const [editedManga, setEditedManga] = useState<MangaInfo>({ ...manga });
    const [availableSites, setAvailableSites] = useState<SiteInfo[]>([]);
    const [selectedSite, setSelectedSite] = useState<string>("");

    useEffect(() => {
        const fetchSites = async () => {
            const sites = await getAllSites();
            setAvailableSites(sites);
        };
        fetchSites();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedManga({ ...editedManga, [name]: value });
    };

    const handleSave = () => {
        onSave(editedManga);
        onClose();
    };

    const handleDeleteSite = (siteToDelete: SiteInfo) => {
        setEditedManga({
            ...editedManga,
            sites: editedManga.sites.filter(site => site.site !== siteToDelete.site),
        });
    };

    const handleAddSite = (siteToAdd: SiteInfo) => {
        setEditedManga({
            ...editedManga,
            sites: [...editedManga.sites, siteToAdd],
        });
        setSelectedSite("");
    };

    const filteredAvailableSites = availableSites.filter(site => !editedManga.sites.some(s => s.site === site.site));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Manga">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={editedManga.name}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                    />
                </div>
                <div></div>
                <div>
                    <label className="block mb-2">Current Chapter</label>
                    <input
                        type="text"
                        name="chapter"
                        value={editedManga.chapter}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Anilist ID</label>
                    <input
                        type="text"
                        name="anilist_id"
                        value={editedManga.anilist_id.toString()}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={editedManga.infos?.description || ""}
                        onChange={e =>
                            setEditedManga({
                                ...editedManga,
                                infos: {
                                    ...editedManga.infos!,
                                    description: e.target.value,
                                },
                            })
                        }
                        className="w-full mb-4 p-2 bg-gray-700 text-white rounded h-32"
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center mb-2">
                        <label className="block mb-2">Sites</label>
                        <select
                            className="bg-gray-700 text-white p-1 rounded ml-4"
                            value={selectedSite}
                            onChange={e => {
                                const site = filteredAvailableSites.find(s => s.site === e.target.value);
                                if (site) handleAddSite(site);
                            }}
                        >
                            <option value="" disabled>
                                Add a site
                            </option>
                            {filteredAvailableSites.map((site, index) => (
                                <option key={index} value={site.site}>
                                    {site.site}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {editedManga.sites.length > 0 ? (
                            editedManga.sites.map((site, index) => (
                                <div key={index} className="bg-gray-600 text-white p-2 rounded flex items-center">
                                    {site.site}
                                    <button className="ml-2 text-red-500" onClick={() => handleDeleteSite(site)}>
                                        x
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-400">No Sites</div>
                        )}
                    </div>
                    {/* Lets add a button Alert that when true is green else is red */}
                    <div className="flex items-center mb-2">
                        {" "}
                        Alert
                        <button
                            className={`${Boolean(editedManga.alert) ? "bg-green-600" : "bg-red-600"} text-white p-1 rounded ml-4`}
                            value={editedManga.alert}
                            onClick={() => {
                                setEditedManga({ ...editedManga, alert: Number(!editedManga.alert) });
                            }}
                        >
                            {editedManga.alert ? "ON" : "OFF"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mr-4">
                    Cancel
                </button>
                <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Save
                </button>
            </div>
        </Modal>
    );
};
