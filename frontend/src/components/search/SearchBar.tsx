import { useState, type ReactNode } from 'react';
import "./SearchBar.css";



interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    filterContent?: ReactNode;
    placeholder?: string;
}

const SearchBar = ({ 
    onSearch,
    filterContent,
    placeholder = 'Search...'
 }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        // event.preventDefault();
        onSearch(searchTerm.trim());
    };

    return(
        <div className='search-bar-container'>
            <div className='search-bar'>
                <input 
                    type='text'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter")
                            handleSearch();
                    }}
                />

                {filterContent && (
                    <button
                        type="button"
                        className='filter-button'
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        Filters
                    </button>
                )}

                <button
                    type="button"
                    className='search-button'
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {showFilters && filterContent && (
                <div className='search-filters'>
                    {filterContent}
                </div>
            )}
        </div>
    );
};

export default SearchBar;