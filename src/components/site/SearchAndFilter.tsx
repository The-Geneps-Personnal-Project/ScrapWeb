import React from "react";

interface SearchAndFilterProps {
    onSearch: (term: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="flex items-center space-x-4">
            <input
                type="text"
                placeholder="Search by site or manga..."
                className="w-full p-2 rounded border border-gray-300"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchAndFilter;
