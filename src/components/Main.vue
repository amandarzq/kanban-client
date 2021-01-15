<template>
   <!-- ISI -->
<div class="kanban-page container" v-if="halaman == 'main'">
  <div class="task-cards">

    <!-- BACKLOG -->
    <div class="backlog category-section">
      <div class="row">
          <div class="section-header">
            <h2>BACKLOG</h2>
          </div>
          <Card v-for="(item, id) in filterBacklog" :key="id"
            @patchTask="patchTask"
            @deleteTask="deleteTask"
            @editTask="editTask"
            :item="item">
          </Card>
      </div>
    </div>
    
    <!-- TODO -->
    <div class="todo category-section">
      <div class="row">
          <div class="section-header">
            <h2>TODO</h2>
          </div>
          <Card v-for="(item, id) in filterTodo" :key="id"
            @patchTask="patchTask"
            @deleteTask="deleteTask"
            @editTask="editTask"
            :item="item">
          </Card>
      </div>
    </div>

    <!-- DOING -->
    <div class="done category-section">
      <div class="row">
          <div class="section-header">
            <h2>DOING</h2>
          </div>
          <Card v-for="(item, id) in filterDoing" :key="id"
            @patchTask="patchTask"
            @deleteTask="deleteTask"
            @editTask="editTask"
            :item="item">
          </Card>
      </div>
    </div>

    <!-- DONE -->
    <div class="completed category-section">
      <div class="row">
          <div class="section-header">
            <h2>DONE</h2>
          </div>
          <Card v-for="(item, id) in filterDone" :key="id"
            @patchTask="patchTask"
            @deleteTask="deleteTask"
            @editTask="editTask"
            :item="item">
          </Card>
      </div>
    </div>
  
<!-- task-cards closing tag -->
</div>
<!-- task-cards closing tag -->
   
  <!-- Modal edit task -->
  <EditTask
  :userTask="userTask"
  :modalShow="modalShow"
  @hideEditForm="hideEditForm"
  @putTask="putTask"
  >
  </EditTask>    

  <!-- Modal add task -->
  <AddTask
    :showAddForm="showAddForm"
    @addTask="addTask"
    @hideAddForm="hideAddForm">
  </AddTask>

<!-- main page closing tag -->
</div>
<!-- main page closing tag -->
    
</template>

<script>
import Card from './Card'
import AddTask from './AddTask'
import EditTask from './EditTask'

export default {
  name: "Main",
  props: ['filterBacklog', 'filterTodo', 'filterDoing', 'filterDone', 'showAddForm', 'modalShow', 'halaman', 'userTask' ],
  components: {
    Card,
    AddTask,
    EditTask
  },
  methods: {
    showAddModal() {
      this.$emit('showAddModal')
    },
    patchTask(category, id) {
      this.$emit('patchTask', category, id)
    },
    deleteTask(category, id) {
      this.$emit('deleteTask', category, id)
    },
    editTask(category, id) {
      this.$emit('editTask', category, id)
    },
    addTask(user) {
      this.$emit('addTask', user)
      },
    hideAddForm() {
      this.$emit('hideAddForm')
    },
    putTask(id) {
      this.$emit('putTask', id)
    },
    hideEditForm() {
      this.$emit('hideEditForm')
    }
  }
}
</script>

<style>

</style>