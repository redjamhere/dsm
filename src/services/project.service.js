import axios from 'axios';

const API_URL = 'http://dsm.ds.do:8080/rest/projects';

class ProjectService {
   getProjects() {
        return axios
            .get(API_URL)
            .then(response => {
                return response.data;
            })
   } 
}

export default new ProjectService;