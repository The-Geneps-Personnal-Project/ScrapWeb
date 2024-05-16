import React, { useState, useEffect } from "react";
import SiteItem from "./SiteItem";
import SearchAndFilter from "./SearchAndFilter";

const SiteList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSites, setFilteredSites] = useState(sites);

    useEffect(() => {
        applyFilters();
    }, [searchTerm]);

    const applyFilters = () => {
        let filtered = sites;

        if (searchTerm) {
            filtered = filtered.filter(
                site =>
                    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    site.mangas.some(manga => manga.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredSites(filtered);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <div>
            <SearchAndFilter onSearch={handleSearch} />
            <hr className="bg-list-color my-4" />
            {filteredSites.map((site, index) => (
                <SiteItem key={index} name={site.name} url={site.url} mangas={site.mangas} />
            ))}
        </div>
    );
};

const sites = [
    {
        name: "Site 1",
        lastChecked: "2024-05-01",
        url: "https://site1.com",
        mangas: ["Manga A", "Manga B"],
    },
    {
        name: "Site 2",
        lastChecked: "2024-04-28",
        url: "https://site2.com",
        mangas: ["Manga C", "Manga D"],
    },
    // Add more sites as needed
];

export default SiteList;
