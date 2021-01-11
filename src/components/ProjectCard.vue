<template>
  <v-card
    color="#34495e"
    dark
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title
          class="headline"
          v-text="project.name"
        ></v-card-title>
        <v-card-subtitle>Ответственный: {{project.bimUser.lastMame}} {{project.bimUser.firstName}}</v-card-subtitle>
        <v-card-text v-if="project.description == null">Нет описания</v-card-text>
        <v-card-text v-else v-text="project.description"></v-card-text>
        <v-card-actions>
          <v-btn
            class="ml-2 mt-5"
            small
            color="green"
            :to="'/tables/' + project.code"
          >
            Открыть
          </v-btn>
          <v-btn
            class="ml-2 mt-5"
            small
            color="#55c6d3"
          >
            Изменить
          </v-btn>
          <v-btn
            class="ml-2 mt-5"
            small
            color="red"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </div>
      <v-avatar
        class="ma-3"
        size="125"
        tile
      >
        <v-img :src="require('@/assets/empty-img.png')"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import randomColor from 'randomcolor';

export default {
    name: 'ProjectCard',
    props: ['project'],
    data: () => ({
      color: randomColor({ luminosity: 'dark', format: 'rgb' })
    }),
    methods: {
    },
}
</script>

<style lang="scss" scoped>

</style>