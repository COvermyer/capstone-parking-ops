import type { User } from '../../models/user.model';
import "./UserList.css";

interface UserListProps {
    users: User[];
}

const UserList = ({ users }: UserListProps) => {
    return(
        <div className='user-list'>
            <div className='user-list-header'>
                <span>Name</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Roles</span>
            </div>


            {users.map((user) => ( // create an entry in the list for each user
                <div className='user-list-row' key={user.user_id}>
                    <span>{user.first_name} {user.last_name}</span>
                    <span>{user.email}</span>
                    <span>{user.phone_number}</span>
                    <span>{user.roles.join(', ')}</span>
                </div>
            ))}
        </div>
    );
};

export default UserList;