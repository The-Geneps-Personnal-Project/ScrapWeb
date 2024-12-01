import React, { createContext, useState, useContext, ReactNode } from "react";
import { MangaContextProps, MangaInfo, SiteInfo } from "types/types";
import {
    addMangaService,
    addSiteToMangaService,
    deleteMangaService,
    deleteSiteFromMangaService,
    updateMangaService,
} from "services/mangas";

const MangaContext = createContext<MangaContextProps | undefined>(undefined);

export const useMangaContext = () => {
    const context = useContext(MangaContext);
    if (!context) {
        throw new Error("useMangaContext must be used within a MangaProvider");
    }
    return context;
};

export const MangaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mangas, setMangas] = useState<MangaInfo[]>([]);

    const addManga = async (manga: MangaInfo): Promise<MangaInfo> => {
        try {
            const newManga = await addMangaService(manga);
            setMangas([...mangas, newManga]);
            return newManga;
        } catch (error) {
            console.error("Failed to add manga:", error);
            throw error;
        }
    };

    const updateManga = async (updatedManga: MangaInfo) => {
        try {
            const updated = await updateMangaService(updatedManga);
            setMangas(mangas.map(m => (m.id === updatedManga.id ? updated : m)));
        } catch (error) {
            console.error("Failed to update manga:", error);
        }
    };

    const updateMangaSites = async (name: string, oldSites: SiteInfo[], newSites: SiteInfo[]) => {
        const sitesToAdd = newSites.filter(site => !oldSites.some(s => s.site === site.site));
        const sitesToDelete = oldSites.filter(site => !newSites.some(s => s.site === site.site));

        const promises = sitesToAdd.map(site => addSiteToMangaService(site.site, site));
        promises.push(...sitesToDelete.map(site => deleteSiteFromMangaService(name, site.site)));

        await Promise.all(promises);
    };

    const deleteManga = async (name: string) => {
        try {
            await deleteMangaService(name);
            setMangas(mangas.filter(m => m.name !== name));
        } catch (error) {
            console.error("Failed to delete manga:", error);
        }
    };

    return (
        <MangaContext.Provider value={{ mangas, addManga, updateManga, updateMangaSites, deleteManga }}>
            {children}
        </MangaContext.Provider>
    );
};
