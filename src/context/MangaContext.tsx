import React, { createContext, useState, useContext, ReactNode } from "react";

interface Manga {
    id: string;
    name: string;
    anilistId: string;
    currentChapter: string;
    sites: string[];
    alert: boolean;
    lastUpdate: string;
    infos?: {
        description: { medium: string};
        image: { medium: string};
        tags: { name: string }[];
    }
}

interface MangaContextProps {
    mangas: Manga[];
    addManga: (manga: Manga) => void;
    updateManga: (id: string, updatedManga: Manga) => void;
    deleteManga: (id: string) => void;
}

const MangaContext = createContext<MangaContextProps | undefined>(undefined);

export const useMangaContext = () => {
    const context = useContext(MangaContext);
    if (!context) {
        throw new Error("useMangaContext must be used within a MangaProvider");
    }
    return context;
};

export const MangaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mangas, setMangas] = useState<Manga[]>([]);

    const addManga = (manga: Manga) => {
        setMangas([...mangas, manga]);
    };

    const updateManga = (id: string, updatedManga: Manga) => {
        setMangas(mangas.map(m => (m.id === id ? updatedManga : m)));
    };

    const deleteManga = (id: string) => {
        setMangas(mangas.filter(m => m.id !== id));
    };

    return (
        <MangaContext.Provider value={{ mangas, addManga, updateManga, deleteManga }}>{children}</MangaContext.Provider>
    );
};
