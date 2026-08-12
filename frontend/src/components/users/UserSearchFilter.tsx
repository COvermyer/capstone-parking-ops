import { useState } from 'react';

interface UserSearchFilterProps {
    onChange: (role: string) => void;
}

const UserSearchFilter = ({ onChange }: UserSearchFilterProps) => {
    const [role, setRole] = useState('');

    return(
        <div className='filter-container'>
            <label htmlFor='role-filter'>
                Role
            </label>

            <select
                id='role-filter'
                value={role}
                onChange={(event) => {
                    const value = event.target.value;
                    console.log(`Role value: ${value}`);
                    setRole(value);
                    onChange(value);
                }}
            >
                <option value="">ALL</option>
                <option value="SYSADMIN">SYSADMIN</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
            </select>
        </div>
    );
};

export default UserSearchFilter;