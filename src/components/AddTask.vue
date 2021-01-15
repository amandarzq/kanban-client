<template>
  <!-- MODAL ADD TASK -->
  <div>
    <div class="modal" tabindex="-1" v-bind:class="{ 'd-block' : showAddForm }">
      <div class="modal-dialog">
        <div class="modal-content bg-transparent">
          <!-- EDIT FORM --> 
          <div class="add-task-page container">
            <form action="#">
              <div class="mb-3">
                <label for="add-title" class="form-label">Task Name</label>
                <input type="text" class="form-control add-title" id="add-title" placeholder="Your task" v-model="userTask.title">
              </div>
              <div class="mb-3">
                <label for="input-category" class="form-label">Category</label>
                <select class="form-select" aria-label="Default select example" v-model="userTask.category" id="input-category">
                  <option value="backlog">Backlog</option>
                  <option value="todo">Todo</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="input-importance" class="form-label">Emergency</label>
                <select class="form-select" aria-label="Default select example" v-model="userTask.importance" id="input-importance">
                  <option value="not-important">Not-important</option>
                  <option value="urgent">Urgent</option>
                  <option value="important">Important</option>
                </select>
              </div>
              <button @click="addTask" type="submit" class="btn btn-outline-info">Submit</button>
              <a @click="hideAddForm" class="btn btn-outline-warning">Cancel</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
   
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      userTask: {
        title: "",
        importance: "",
        category: ""
      },
    }
  },
  props: ['showAddForm'],
  methods: {
    addTask() {
        // console.log(this.userTask)
        this.$emit('addTask', this.userTask)
      },
    hideAddForm() {
      this.$emit('hideAddForm')
      this.userTask.title = ""
      this.userTask.importance = ""
      this.userTask.category =""
    }
  }
 
}
</script>

<style>

</style>