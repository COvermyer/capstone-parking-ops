import { useState } from 'react';

import UserList from "../components/users/UserList";
import UserSearchFilter from '../components/users/UserSearchFilter';
import SearchBar from "../components/search/SearchBar";
import type { User } from "../models/user.model";

const Test = () => {
    const testUsers: User[] = [
        {
            user_id: 1,
            company_id: 1,
            first_name: 'John',
            last_name: 'Smith',
            email: 'john.smith@example.com',
            phone_number: '602-555-1234',
            created: '2026-08-01',
            roles: ['ADMIN']
        },
        {
            user_id: 2,
            company_id: 1,
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane.doe@example.com',
            phone_number: '602-555-5678',
            created: '2026-08-03',
            roles: ['USER']
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState('');
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        console.log(`Searching for ${searchTerm}`);
    };
    
    return(
        <div className="test-page">
            <div><SearchBar onSearch={handleSearch} filterContent={<UserSearchFilter onChange={setRole}/>}/></div>

            {searchTerm && (
                <p>
                    Current Search: {searchTerm}
                    Role: {role}
                </p>
            )}

            <h1>Users</h1>
            <UserList users={testUsers} />
        </div>
    )
};

export default Test;