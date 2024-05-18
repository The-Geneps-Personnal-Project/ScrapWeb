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
        url: "https://site1.com",
        mangas: ["Manga A", "Manga B", "Manga C", "Manga D", "Manga ENGEHGERHGKEJRHGLERHLJegnekrjgerkjghelrgjerlghej", "Manga F", "Manga G", "Manga H", "Manga I", "Manga J", "Manga K", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L", "Manga L"],
    },
    {
        name: "Site 2",
        url: "https://site2.com",
        mangas: ["Manga M", "Manga N", "Manga O", "Manga P", "Manga Q", "Manga R", "Manga S", "Manga T", "Manga U", "Manga V"],
    },
];

export default SiteList;
