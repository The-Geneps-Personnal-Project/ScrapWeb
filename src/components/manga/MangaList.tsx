import React, { useState, useEffect } from "react";
import MangaItem from "./MangaItem";
import SearchAndFilter from "./SearchAndFilter";
import { getAllMangas } from "../../services/mangas";
import { MangaInfo } from "../../types/types";

const MangaList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [date, setDate] = useState("");
    const [chapters, setChapters] = useState("");
    const [selectedSite, setSelectedSite] = useState("");
    const [mangas, setMangas] = useState<MangaInfo[]>([]);
    const [filteredMangas, setFilteredMangas] = useState<MangaInfo[]>([]);
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [availableSites, setAvailableSites] = useState<string[]>([]);

    useEffect(() => {
        const fetchMangas = async () => {
            const data = await getAllMangas();
            setMangas(data);
            setFilteredMangas(data);

            const tags = Array.from(new Set(data.flatMap(manga => manga.infos?.tags.map(tag => tag.name) || [])));
            setAvailableTags(tags);

            const sites = Array.from(new Set(data.flatMap(manga => manga.sites.map(siteInfo => siteInfo.site))));
            setAvailableSites(sites);
        };

        fetchMangas();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, selectedTag, date, chapters, selectedSite]);

    const applyFilters = () => {
        let filtered = mangas;

        if (searchTerm) {
            filtered = filtered.filter(manga => manga.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (selectedTag) {
            filtered = filtered.filter(manga => manga.infos?.tags.some(tag => tag.name === selectedTag));
        }

        if (date) {
            filtered = filtered.sort((a, b) => {
                const dateA = a.last_update ? new Date(a.last_update).getTime() : 0;
                const dateB = b.last_update ? new Date(b.last_update).getTime() : 0;
                if (date === "most-recent") {
                    return dateB - dateA;
                } else {
                    return dateA - dateB;
                }
            });
        }

        if (chapters) {
            filtered = filtered.sort((a, b) => {
                if (chapters !== "most-chapters") {
                    return parseFloat(b.chapter) - parseFloat(a.chapter);
                } else {
                    return parseFloat(a.chapter) - parseFloat(b.chapter);
                }
            });
        }

        if (selectedSite) {
            filtered = filtered.filter(manga => manga.sites.some(siteInfo => siteInfo.site === selectedSite));
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
                    name={manga.name}
                    chapter={manga.chapter}
                    last_update={manga.last_update || "Unknown"} // Use a default string if last_update is undefined
                    sites={manga.sites}
                    infos={manga.infos}
                    anilist_id={manga.anilist_id}
                />
            ))}
        </div>
    );
};

export default MangaList;
