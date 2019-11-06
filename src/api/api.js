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
    }
}



