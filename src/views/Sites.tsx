import React from "react";
import SiteList from "../components/site/SiteList";

const Sites: React.FC = () => {
    return (
        <div className="bg-background-color min-h-screen p-4">
            <SiteList />
        </div>
    );
};

export default Sites;
