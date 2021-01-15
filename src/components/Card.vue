
<template>
  <div class="child-card" v-bind:class="item.importance">
     <h3> {{ item.title }} </h3>
     <p class="updated-at">{{ item.updatedAt }}</p>
      <p class="card-user-name">By: {{ item.User.name }}</p>
      <div class="actions">
          <a class="patch" href="#" @click="patchTask(back, item.id)"> back </a>
          <a class="del" href="#" @click="deleteTask(item.id)">delete</a>
          <a class="edit" href="#" @click="editTask(item.id)">edit</a>
          <a class="patch" href="#" @click="patchTask(next, item.id)"> next </a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['item'],
  methods: {
    patchTask(item, category) {
      this.$emit('patchTask', item, category)
    },
    deleteTask(item) {
      this.$emit('deleteTask', item)
    },
    editTask(item) {
      this.$emit('editTask', item)
    }
  },
  computed: {
    back() {
      switch (this.item.category) {
        case 'backlog':
          return 'done'
        case 'todo':
          return 'backlog'
        case 'doing':
          return 'todo'
        case 'done':
          return 'doing'
      }
    },
    next() {
      switch (this.item.category) {
        case 'backlog':
          return 'todo'
        case 'todo':
          return 'doing'
        case 'doing':
          return 'done'
        case 'done':
          return 'backlog'
      }
    }
  }
}
</script>

<style>

</style>