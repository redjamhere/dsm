import axios from 'axios';

const API_URL = 'http://dsm.ds.do:8080/rest/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logOut(){
        localStorage.removeItem('user');
    }
}

export default new AuthService();