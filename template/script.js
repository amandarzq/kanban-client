/* eslint-disable */
const app = new Vue({
  el: '#app',
  data: {
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

    login() {
      axios({
          method: 'POST',
          url: `${this.server}/login`,
          data: {
            email: this.user.email,
            password: this.user.password
          }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.checkAuth()
          this.user.email = ''
          this.user.password = ''
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout() {
      localStorage.removeItem('access_token')
      this.checkAuth()
    },

    register() {
      axios({
        method: 'POST',
        url: `${this.server}/register`,
        data: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        }
      })
        .then(() => {
          this.user.email = ''
          this.user.password = ''
          this.changePage('login')
        })
        .catch(err => {
          console.log(err)
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
        })
        .catch(err => {
          console.log(err)
        })
    },

    showAddModal() {
      this.showAddForm = true
    },

    addTask() {
      axios({
        method: 'POST',
        url: `${this.server}/tasks`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.userTask.title,
          importance: this.userTask.importance,
          category: this.userTask.category
        }
      })
        .then(response => {
          this.showAddForm = false
          this.userTask.title = ""
          this.userTask.importance = ""
          this.userTask.category = ""
          this.fetchAllTasks()
        })
        .catch(err => {
          console.log(err)
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
          console.log(err)
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
          console.log(err)
        })
    },
    
    hideEditForm() {
      this.modalShow = false
      this.fetchAllTasks()
    },

    hideAddForm() {
      this.showAddForm = false
      this.userTask.title = ""
      this.userTask.importance = ""
      this.userTask.category = ""
      this.fetchAllTasks()
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
          this.userTask.id = ""
          this.userTask.title = ""
          this.userTask.importance = ""
          this.userTask.category = ""
          this.fetchAllTasks()
          this.modalShow = false
        })
        .catch(err => {
          console.log(err)
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
          console.log(err)
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
  },
})
