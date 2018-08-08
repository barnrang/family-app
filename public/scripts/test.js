String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

Vue.component('todo-item', {
  props:['todo'],
  template: '<li class=\'todo-item\'>{{todo.name}}\
   <span :class=\"classChoose\" @click=\"updateStatus\" ></span>\
  </li>',
  computed: {
    classChoose: function () {
      if(this.todo.done) return 'todo-status done';
      else return 'todo-status undone'
    }
  },
  methods: {
    updateStatus: function () {
      this.$emit('update-status', this.todo)
      console.log('click activate')
    }
  }
})

$(document).ready(() => {

  var todolist = new Vue({
    el: '#todolist',
    data: {
      jobs: [
        {id:0, name: "test1", done: false},
        {id:1, name: "test2", done: true}
      ],
      newName: '',
      max_id: 1,
    },
    methods: {
      submit: function () {
        if(!this.newName.isEmpty()){
          this.max_id++;
          this.jobs.push({id: this.max_id, name:this.newName, done: false})
          this.newName = ''
        }
      },
      updateStatus: function (data) {
        var id = data.id;
        var idx = -1;
        var jobs = this.jobs;
        for(var i = 0; i < jobs.length; i++){
          if(jobs[i].id == id){
            idx = i;
            break;
          }
        }
        this.jobs[idx].done = !this.jobs[idx].done;
      }
    }
  })
})
