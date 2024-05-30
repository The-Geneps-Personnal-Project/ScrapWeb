import React, { useState, useEffect } from "react";
import MangaItem from "./MangaItem";
import SearchAndFilter from "./SearchAndFilter";

const MangaList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [date, setDate] = useState("");
    const [chapters, setChapters] = useState("");
    const [selectedSite, setSelectedSite] = useState("");
    const [filteredMangas, setFilteredMangas] = useState(mangas);
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [availableSites, setAvailableSites] = useState<string[]>([]);

    useEffect(() => {
        const tags = Array.from(new Set(mangas.flatMap(manga => manga.genres)));
        setAvailableTags(tags);

        const sites = Array.from(new Set(mangas.flatMap(manga => manga.sites)));
        setAvailableSites(sites);

        applyFilters();
    }, [searchTerm, selectedTag, date, chapters, selectedSite]);

    const applyFilters = () => {
        let filtered = mangas;

        if (searchTerm) {
            filtered = filtered.filter(manga => manga.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (selectedTag) {
            filtered = filtered.filter(manga => manga.genres.includes(selectedTag));
        }

        if (date) {
            filtered = filtered.sort((a, b) => {
                if (date === "most-recent") {
                    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
                } else {
                    return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
                }
            });
        }

        if (chapters) {
            filtered = filtered.sort((a, b) => {
                if (chapters === "most-chapters") {
                    return b.currentChapter - a.currentChapter;
                } else {
                    return a.currentChapter - b.currentChapter;
                }
            });
        }

        if (selectedSite) {
            filtered = filtered.filter(manga => manga.sites.includes(selectedSite));
        }

        setFilteredMangas(filtered);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleFilter = (filters: { tag: string; date: string; chapters: string; site: string }) => {
        setSelectedTag(filters.tag);
        setDate(filters.date);
        setChapters(filters.chapters);
        setSelectedSite(filters.site);
    };

    return (
        <div>
            <SearchAndFilter
                onSearch={handleSearch}
                onFilter={handleFilter}
                availableTags={availableTags}
                availableSites={availableSites}
            />
            <hr className="bg-list-color my-4" />
            {filteredMangas.map((manga, index) => (
                <MangaItem
                    key={index}
                    title={manga.title}
                    currentChapter={manga.currentChapter}
                    lastUpdated={manga.lastUpdated}
                    sites={manga.sites}
                    thumbnail={manga.thumbnail}
                    description={manga.description}
                    genres={manga.genres}
                />
            ))}
        </div>
    );
};

const mangas = [
    {
        title: "Manga 1",
        currentChapter: 10,
        lastUpdated: "2024-05-01",
        sites: ["Site A", "Site B"],
        thumbnail: "https://via.placeholder.com/128x192",
        description: "This is a short description of Manga 1. It gives an overview of the plot and main characters.",
        genres: ["Action", "Adventure"],
    },
    {
        title: "Manga 2",
        currentChapter: 5,
        lastUpdated: "2024-04-28",
        sites: ["Site C"],
        thumbnail: "https://via.placeholder.com/128x192",
        description: "This is a short description of Manga 2. It gives an overview of the plot and main characters.",
        genres: ["Drama", "Fantasy"],
    },
    // Add more mangas as needed
];

export default MangaList;
