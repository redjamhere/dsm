import ProjectService from '../services/project.service';

const initialState = {projects: null, selectedProject: null};

export const projects = {
    namespaced: true,
    state: initialState,
    actions: {
        setProject({commit}, project) {
            commit('setProjectSuccess', project);
        },
        getProjects({commit}, projectId = '') {
            return ProjectService.getProjects(projectId)
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
        setProjectSuccess(state, project) {
            state.selectedProject = project;
        },
        projectsSuccess(state, projects) {
            state.projects = projects;
        },
        projectsFailure(state) {
            state.projects = null;
        }
    }
}