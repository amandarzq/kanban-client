<template>
  <div> 

    <Navbar 
      v-if="halaman =='login' || halaman == 'register' || halaman == 'main'" 
      @changePage="changePage"
      @showAddModal="showAddModal"
      @logout="logout"
      :halaman="halaman">
    </Navbar>

    <LoginForm 
      v-if="halaman == 'login'" 
      @login="login"
      @checkAuth="checkAuth"
      @success="onSignInSuccess"
      @error="onSignInError"
      :halaman="halaman">
    </LoginForm>

    <RegisterForm 
      v-if="halaman == 'register'" 
      @register="register"
      :halaman="halaman">
    </RegisterForm>

    <Main 
      v-if="halaman == 'main'"
      @patchTask="patchTask"
      @deleteTask="deleteTask"
      @editTask="editTask"

      :filterBacklog="filterBacklog"
      :filterTodo="filterTodo"
      :filterDoing="filterDoing"
      :filterDone="filterDone"
      
      :userTask="userTask"
      :modalShow="modalShow"
      @putTask="putTask"
      @hideEditForm="hideEditForm"
      
      :showAddForm="showAddForm"
      @addTask="addTask"
      @hideAddForm="hideAddForm"

      :halaman="halaman">
    </Main>
   
  </div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import RegisterForm from "./components/RegisterForm"
import Main from "./components/Main"

export default {
  name: "App",
  data() {
    return {
      halaman: 'login',
      tasks: [],
      modalShow: false,
      showAddForm: false,
      user: {
        name: "",
        email: "",
        password: ""
      },
      userTask: {
        id: "",
        title: "",
        importance: "",
        category: "",
        updatedAt: ""
      },
      server: 'http://localhost:3000'
    }
  },
  components: {
    LoginForm,
    Navbar,
    RegisterForm,
    Main
  },
  methods: {

    changePage(page) {
      this.halaman = page
    },

    checkAuth() {
      if (localStorage.getItem('access_token')) {
        this.changePage('main')
        this.fetchAllTasks()
      } else {
        this.changePage('login')
      }
    },

    login(user) {
      console.log('kok masuk sini?')
      axios({
          method: 'POST',
          url: `${this.server}/login`,
          data: {
            email: user.email,
            password: user.password
          }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.checkAuth()
        })
        .catch(err => {
          let errors = err.response.data.message
          console.log(errors)
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },

    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile() 
      const id_token = googleUser.getAuthResponse().id_token

      axios({
        method: 'POST',
        url: `${this.server}/loginGoogle`,
        data: {
          id_token
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.changePage('main')
          this.checkAuth()
        })
        .catch(err => {
          const errors = err.response.data.message
          
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },

    onSignInError (error) {
      console.log('OH NOES', error)
    },

    logout() {
      localStorage.removeItem('access_token')
      this.checkAuth()
    },

    register(user) {
      axios({
        method: 'POST',
        url: `${this.server}/register`,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      })
        .then(() => {
          this.changePage('login')
        })
        .catch(err => {
          let errors = err.response.data.message
          console.log(errors)
          if (errors.length > 4) {
            errors = 'Your name/password/email is not valid'
          }
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },

    fetchAllTasks() {
      axios({
        method: 'GET',
        url: `${this.server}/tasks`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          this.tasks = response.data
          console.log(response.data, 'ini response fetchall')
        })
        .catch(err => {
          const errors = err.response.data.message
          console.log(errors)
        })
    },

    showAddModal() {
      this.showAddForm = true
    },

    addTask(userTask) {
      axios({
        method: 'POST',
        url: `${this.server}/tasks`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: userTask.title,
          importance: userTask.importance,
          category: userTask.category
        }
      })
        .then(response => {
          console.log('masuk sini')
          console.log(response.data)
          this.showAddForm = false
          userTask.title = ""
          userTask.importance = ""
          userTask.category = ""
          this.fetchAllTasks()
        })
        .catch(err => {
          let errors = err.response.data.message
          console.log(errors)
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },

    deleteTask(id) {
      axios({
        method: 'DELETE',
        url: `${this.server}/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          this.fetchAllTasks()
        })
        .catch(err => {
          let errors = err.response.data.message
          console.log(errors)
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },

    editTask(id) {
      axios({
        method: 'GET',
        url: `${this.server}/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          this.modalShow = true
          const user = response.data
          this.userTask.id = +user.id
          this.userTask.title = user.title
          this.userTask.importance = user.importance
          this.userTask.category = user.category
        })
        .catch(err => {
          let errors = err.response.data.message
          console.log(errors)
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },
    
    hideEditForm() {
      this.modalShow = false
    },

    hideAddForm() {
      this.showAddForm = false
    },

    putTask(TaskId) {
      const id = Number(TaskId)
      axios({
        method: 'PUT',
        url: `${this.server}/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.userTask.title,
          importance: this.userTask.importance,
          category: this.userTask.category
        }
      })
        .then(() => {
          // this.userTask.id = ""
          // this.userTask.title = ""
          // this.userTask.importance = ""
          // this.userTask.category = ""
          this.fetchAllTasks()
          this.modalShow = false
        })
        .catch(err => {
          let errors = err.response.data.message
          console.log(errors)
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },

    patchTask(category, id) {
      axios({
        method: 'PATCH',
        url: `${this.server}/tasks/${id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          category: category
        }
      })
        .then(response => {
          this.fetchAllTasks()
          console.log(response)
        })
        .catch(err => {
          let errors = err.response.data.message
          console.log(errors)
          Swal.fire({
            title: 'Error!',
            text: errors,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        })
    },

    formattedTodo(tasks) {
      return tasks.map(task => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(task.updatedAt)
        task.updatedAt =  date.toLocaleString('id-ID', options)
        return task
      })
    }
  }, 

  created() {
    this.checkAuth()
  },

  computed: {
    filterBacklog() {
      let backlog = this.tasks.filter(e => e.category === 'backlog')
      return this.formattedTodo(backlog)
    },
    filterTodo() {
      let todo = this.tasks.filter(e => e.category === 'todo')
      return this.formattedTodo(todo)
    },
    filterDoing() {
      let doing = this.tasks.filter(e => e.category === 'doing')
      return this.formattedTodo(doing)
    },
    filterDone() {
      let done = this.tasks.filter(e => e.category === 'done')
      return this.formattedTodo(done)
    }
  }
}
</script>

<style>

</style>