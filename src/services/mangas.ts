import axios from 'axios'
import { MangaInfo, SiteInfo } from '../types/types'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

const cleanDescription = (description: string) => {
    if (!description) return '';
    const strippedDescription = description.replace(/<\/?[^>]+(>|$)/g, '');
    const cleanedDescription = strippedDescription.replace(/\(Source:.*\)$/, '');
    return cleanedDescription.trim();
};

// Mangas

export async function getAllMangas(): Promise<MangaInfo[]> {
    try {
        const response = await api.get('/mangas')
        return response.data.map((manga: MangaInfo) => {
            return {
                ...manga,
                infos: {
                    ...manga.infos,
                    description: cleanDescription(manga.infos?.description || ''),
                },
            };
        })
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch mangas")
    }
}

export async function getMangaByName(name: string): Promise<MangaInfo> {
    try {
        const response = await api.get(`/mangas/${name}`)
        return response.data
    } catch (error) {
        throw new Error("Failed to fetch manga")
    }
}

export async function getMangaFromSite(name: string): Promise<MangaInfo> {
    try {
        const response = await api.get(`/mangas/site/${name}`)
        return response.data
    } catch (error) {
        throw new Error("Failed to fetch manga")
    }
}

export async function addManga(manga: MangaInfo): Promise<MangaInfo> {
    try {
        const response = await api.post('/mangas', manga)
        return response.data
    } catch (error) {
        throw new Error("Failed to add manga")
    }
}

export async function addSiteToManga(name: string, site: SiteInfo): Promise<MangaInfo> {
    try {
        const response = await api.post(`/mangas/site`, { name, site})
        return response.data
    } catch (error) {
        throw new Error("Failed to add site to manga")
    }
}

export async function updateManga(name: string, manga: MangaInfo): Promise<MangaInfo> {
    try {
        const response = await api.put(`/mangas/`, manga)
        return response.data
    } catch (error) {
        throw new Error("Failed to update manga")
    }
}

export async function updateMangaChapter(name: string, chapter: string, last_update: string): Promise<MangaInfo> {
    try {
        const response = await api.put(`/mangas/chapter`, { name, chapter, last_update })
        return response.data
    } catch (error) {
        throw new Error("Failed to update manga chapter")
    }
}

export async function deleteSiteFromManga(name: string, site: string): Promise<MangaInfo> {
    try {
        const response = await api.delete(`/mangas/site`, { data: { name, site }})
        return response.data
    } catch (error) {
        throw new Error("Failed to delete site from manga")
    }

}

export async function deleteManga(name: string): Promise<void> {
    try {
        await api.delete(`/mangas/${name}`)
    } catch (error) {
        throw new Error("Failed to delete manga")
    }
}