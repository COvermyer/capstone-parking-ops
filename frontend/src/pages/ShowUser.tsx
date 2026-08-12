import { useEffect, useState } from 'react';
import { User } from '../models/user.model';
import api from '../services/api';

interface ShowUserProps {
    user_id: number;
}

const ShowUser = ({ user_id }: ShowUserProps) => {
    // Eventually: GET /user/{user_id}
    console.log(`Showing User: ${user_id}`)

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const response = await api.get(`/users/${user_id}`);
            setUser(response.data);
        };

        loadUser();
    }, [user_id]);

    if (!user) {
        return (<div>Loading...</div>)
    }

    return (
        <div className='show-user'>
            <header className='show-user-header'>
                <div>
                    <span className='show-user-id'>
                        USER #{user.user_id}
                    </span>

                    <h1>
                        {user.first_name} {user.last_name}
                    </h1>

                    <p>
                        
                    </p>
                </div>
            </header>
        </div>
    )
};

export default ShowUser;