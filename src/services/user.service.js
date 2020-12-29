import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://dsm.ds.do:8080/rest/';

class UserService {
    getFileModels() {
        return axios.get(API_URL + 'filemodels');
    }
}