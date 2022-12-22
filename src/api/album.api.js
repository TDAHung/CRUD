// get
// post
// put, patch
// delete

import instance from "../utils/axios";

const albumApi = {
    getAll: () => {
        return instance.get(`/albums`);
    },
    getById: (userID) => {
        return instance.get(`/albums?userId=${userID}`);
    },
    delete: (userID) => {
        return instance.delete(`/albums/${userID}`);
    },
    update: (userID, newAlbum) => {
        return instance.put(`/albums/${userID}`, newAlbum);
    }
};

export default albumApi;