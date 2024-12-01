import axios from "axios";
import { MangaInfo, SiteInfo } from "types/types";
import { getFromApi, putToApi, deleteFromApi } from "./helper";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const cleanDescription = (description: string) => {
    if (!description) return "";
    const strippedDescription = description.replace(/<\/?[^>]+(>|$)/g, "");
    const cleanedDescription = strippedDescription.replace(/\(Source:.*\)$/, "");
    return cleanedDescription.trim();
};

// Mangas

export async function getAllMangas(): Promise<MangaInfo[]> {
    try {
        const response: MangaInfo[] = await getFromApi("mangas");
        return response.map((manga: MangaInfo) => {
            return {
                ...manga,
                infos: {
                    ...manga.infos,
                    description: cleanDescription(manga.infos?.description || ""),
                },
            };
        });
    } catch (error) {
        throw new Error("Failed to fetch mangas");
    }
}

export async function getMangaByName(name: string): Promise<MangaInfo> {
    try {
        const response = await api.get(`mangas/${name}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch manga");
    }
}

export async function getMangaFromSite(name: string): Promise<MangaInfo> {
    try {
        const response = await api.get(`mangas/site/${name}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch manga");
    }
}

export async function addMangaService(manga: MangaInfo): Promise<MangaInfo> {
    try {
        const response = await api.post("mangas", manga);
        return response.data;
    } catch (error) {
        throw new Error("Failed to add manga");
    }
}

export async function addSiteToMangaService(name: string, site: SiteInfo): Promise<MangaInfo> {
    try {
        const response = await api.post(`mangas/site`, { name, site });
        return response.data;
    } catch (error) {
        throw new Error("Failed to add site to manga");
    }
}

export async function updateMangaService(manga: MangaInfo): Promise<MangaInfo> {
    try {
        console.log(manga);
        const response = await putToApi(`mangas`, manga);
        return response as MangaInfo;
    } catch (error) {
        throw new Error("Failed to update manga");
    }
}

export async function updateMangaChapterService(
    name: string,
    chapter: string,
    last_update: string
): Promise<MangaInfo> {
    try {
        const response = await api.put(`mangas/chapter`, { name, chapter, last_update });
        return response.data;
    } catch (error) {
        throw new Error("Failed to update manga chapter");
    }
}

export async function deleteSiteFromMangaService(manga: string, site: string): Promise<MangaInfo> {
    try {
        const response = await deleteFromApi(`mangas/site`, { manga, site });
        return response as MangaInfo;
    } catch (error) {
        throw new Error("Failed to delete site from manga");
    }
}

export async function deleteMangaService(name: string): Promise<void> {
    try {
        deleteFromApi(`mangas`, { name });
    } catch (error) {
        throw new Error("Failed to delete manga");
    }
}
