import React, { useState, useEffect } from "react";

interface SearchAndFilterProps {
    onSearch: (searchTerm: string) => void;
    onFilter: (filters: { tag: string; date: string; chapters: string; site: string }) => void;
    availableTags: string[];
    availableSites: string[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch, onFilter, availableTags, availableSites }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [date, setDate] = useState("");
    const [chapters, setChapters] = useState("");
    const [selectedSite, setSelectedSite] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedTag(value);
        onFilter({ tag: value, date, chapters, site: selectedSite });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setDate(value);
        onFilter({ tag: selectedTag, date: value, chapters, site: selectedSite });
    };

    const handleChaptersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setChapters(value);
        onFilter({ tag: selectedTag, date, chapters: value, site: selectedSite });
    };

    const handleSiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedSite(value);
        onFilter({ tag: selectedTag, date, chapters, site: value });
    };

    return (
        <div className="flex items-center mb-4">
            <div className="mr-4">
                <label htmlFor="tags" className="block text-sm font-medium text-white">
                    Tags
                </label>
                <select
                    id="tags"
                    className="bg-gray-700 text-white p-2 rounded"
                    value={selectedTag}
                    onChange={handleTagChange}
                >
                    <option value="">All</option>
                    {availableTags.map(tag => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mr-4">
                <label htmlFor="date" className="block text-sm font-medium text-white">
                    Date of Update
                </label>
                <select
                    id="date"
                    className="bg-gray-700 text-white p-2 rounded"
                    value={date}
                    onChange={handleDateChange}
                >
                    <option value="">Any</option>
                    <option value="most-recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
            <div className="mr-4">
                <label htmlFor="chapters" className="block text-sm font-medium text-white">
                    Chapters
                </label>
                <select
                    id="chapters"
                    className="bg-gray-700 text-white p-2 rounded"
                    value={chapters}
                    onChange={handleChaptersChange}
                >
                    <option value="">Any</option>
                    <option value="most-chapters">Most Chapters</option>
                    <option value="fewest-chapters">Fewest Chapters</option>
                </select>
            </div>
            <div className="mr-4">
                <label htmlFor="sites" className="block text-sm font-medium text-white">
                    Sites
                </label>
                <select
                    id="sites"
                    className="bg-gray-700 text-white p-2 rounded"
                    value={selectedSite}
                    onChange={handleSiteChange}
                >
                    <option value="">All</option>
                    {availableSites.map(site => (
                        <option key={site} value={site}>
                            {site}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-white">
                    Search
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="bg-gray-700 text-white p-2 rounded w-full"
                    placeholder="Search by name..."
                />
            </div>
        </div>
    );
};

export default SearchAndFilter;
