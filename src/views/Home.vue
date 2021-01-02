<template>
    <v-container fluid class="projects-wrapper" fill-height>
      <v-row dense>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="3"
        >
          <ProjectCard :item="item"/>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
import ProjectCard from '@/components/ProjectCard';
export default {
  name: 'Home',
  components: {
    ProjectCard
  },
  data: () => ({
    items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
        
      ],
  })
}
</script>

<style lang="scss" scoped>
  .projects-wrapper {
    background-image: url('../assets/logoBG.png');
    background-size: 100%;
    background-repeat: repeat;
  }
</style>
