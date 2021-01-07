<template>
    <v-container fluid class="projects-wrapper" fill-height align-start no-gutter>
      <v-row >
        <v-col
          v-for="(project, i) in  this.$store.state.projects.projects"
          :key="i"
          md="3"
        > 
          <ProjectCard v-if="!project.deleted" :project="project"/>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
import ProjectCard from '@/components/ProjectCard';
export default {
  name: 'Projects',
  components: {
    ProjectCard
  },
  data: () => ({
    projects: [],
  }),
  created() {
    if(this.projects.length === 0) {
      this.$store.dispatch('projects/getProjects');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
