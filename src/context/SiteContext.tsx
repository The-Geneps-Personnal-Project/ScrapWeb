import React, { createContext, useState, useContext, ReactNode } from "react";

interface Site {
    id: string;
    url: string;
}

interface SiteContextProps {
    sites: Site[];
    addSite: (site: Site) => void;
    updateSite: (id: string, updatedSite: Site) => void;
    deleteSite: (id: string) => void;
}

const SiteContext = createContext<SiteContextProps | undefined>(undefined);

export const useSiteContext = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error("useSiteContext must be used within a SiteProvider");
    }
    return context;
};

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sites, setSites] = useState<Site[]>([]);

    const addSite = (site: Site) => {
        setSites([...sites, site]);
    };

    const updateSite = (id: string, updatedSite: Site) => {
        setSites(sites.map(s => (s.id === id ? updatedSite : s)));
    };

    const deleteSite = (id: string) => {
        setSites(sites.filter(s => s.id !== id));
    };

    return <SiteContext.Provider value={{ sites, addSite, updateSite, deleteSite }}>{children}</SiteContext.Provider>;
};
