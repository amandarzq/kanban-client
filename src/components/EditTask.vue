<template>
      <!-- MODAL EDIT TASK -->
    <div class="modal" tabindex="-1" v-bind:class="{ 'd-block' : modalShow }">
      <div class="modal-dialog">
        <div class="modal-content bg-transparent">
         <!-- EDIT FORM --> 
            <div class="editContainer">
              <form action="#" @submit.prevent='putTask(userTask.id)'>
                <div class="mb-3">
                  <label for="edit-title" class="form-label">Task Name</label>
                  <input  type="text" class="form-control edit-title" id="add-title" placeholder="Your task" v-model="userTask.title">
                </div>
                <div class="mb-3">
                  <label for="input-category" class="form-label">Category</label>
                  <select class="form-select" aria-label="Default select example" v-model="userTask.category" id="input-category">
                    <option selected value="backlog">Backlog</option>
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
                <button type="submit" class="btn btn-outline-info">Submit</button>
                <a @click="hideEditForm" class="btn btn-outline-warning">Cancel</a>
              </form>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: 'EditTask',
  props: ['userTask', 'modalShow'],
  methods: {
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