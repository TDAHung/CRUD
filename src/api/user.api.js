import instance from "../utils/axios"

const userApi = {
    getAll: () => {
        return instance.get(`/users`);
    },
    getById: (userID) => {
        return instance.get(`/users?userId=${userID}`);
    },
    delete: (userID) => {
        return instance.delete(`/users/${userID}`);
    },
}

export default userApi;