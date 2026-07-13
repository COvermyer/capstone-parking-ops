import api from './api';

const getUsers = async () => {
    const response = await api.get('/api/users');

    return response;
};

const userService = {
    getUsers
}

export default userService;