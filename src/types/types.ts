import { ReactNode } from "react";

export interface MangaInfo {
    id?: number;
    sites: SiteInfo[];
    anilist_id: number;
    alert: number;
    chapter: string;
    name: string;
    last_update?: string;
    infos?: {
        tags?: { name: string }[];
        description?: string;
        coverImage?: { medium: string; large: string };
    };
    onDelete?: (manga: MangaInfo) => void;
    onEdit?: (manga: MangaInfo) => void;
}

export interface SiteInfo {
    id: number;
    site: string;
    url: string;
    chapter_url: string;
    chapter_limiter: string;
    mangas: MangaInfo[];
}

export interface SiteItemProps {
    site: string;
    url: string;
    chapterUrl: string;
    chaterLimiter: string;
    mangas: MangaInfo[];
}

export interface SearchAndFilterProps {
    onSearch: (searchTerm: string) => void;
}

export interface SearchAndFilterMangaProps {
    onSearch: (searchTerm: string) => void;
    onFilter: (filters: { tag: string; date: string; chapters: string; site: string }) => void;
    availableTags: string[];
    availableSites: string[];
}

export interface EditMangaModalProps {
    isOpen: boolean;
    manga: MangaInfo;
    onClose: () => void;
    onSave: (updatedManga: MangaInfo) => void;
}

export interface MangaContextProps {
    mangas: MangaInfo[];
    addManga: (manga: MangaInfo) => void;
    updateManga: (manga: MangaInfo) => void;
    updateMangaSites: (name: string, oldSites: SiteInfo[], newSites: SiteInfo[]) => void;
    deleteManga: (name: string) => void;
}

export interface SiteContextProps {
    sites: SiteInfo[];
    addSite: (site: SiteInfo) => void;
    updateSite: (id: number, updatedSite: SiteInfo) => void;
    deleteSite: (id: number) => void;
}

export interface SidebarProps {
    isCollapsed: boolean;
    onToggleSidebar: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}
