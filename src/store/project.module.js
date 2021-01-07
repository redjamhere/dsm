import ProjectService from '../services/project.service';

const initialState = {projects: null};

export const projects = {
    namespaced: true,
    state: initialState,
    actions: {
        getProjects({commit}) {
            return ProjectService.getProjects()
                .then(
                    projects => {
                        commit('projectsSuccess', projects);
                        return Promise.resolve(projects);
                    },
                    error => {
                        commit('projectsFailure');
                        return Promise.reject(error);
                    }
                );
        }   
    },
    mutations: {
        projectsSuccess(state, projects) {
            state.projects = projects;
        },
        projectsFailure(state) {
            state.projects = null;
        }
    }
}