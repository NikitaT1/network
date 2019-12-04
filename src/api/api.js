import axios from "axios";



const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "1f7d7956-460f-4c20-a95b-d50d82e17d88"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

});

export const usersAPI = {
    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
            {
                withCredentials: true,
            })
            .then(response => {
                return response.data})
    },
    followUser(id) {
        return instance.post(`follow/${id}`, {},)
            .then(responce => {
                return responce.data
            });
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`, {},)
            .then(responce => {
                return responce.data
            });
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status:status});
    },
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
};



