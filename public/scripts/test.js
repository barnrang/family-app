String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

Vue.component('people-list', {
  props: ['peopleList'],
  template: '<select class=\"people-list\">\
    <option \
    v-for=\"person in peopleList\"\
    value=\"person\">\
    {{person}}</option>\
    </select>',
  computed: {
    test: function () {
      console.log(this.peopleList);
    }
  },
  created() {
    //console.log(this.peopleList);
  }
})

Vue.component('todo-item', {
  props:['todo', 'peopleList'],
  template: '<li class=\'todo-item\'>{{todo.name}}\
   <span :class=\"classChoose\" @click=\"updateStatus\" >{{moneyChoose}}</span>\
   <people-list v-bind:people-list=\"peopleList\"></people-list>\
  </li>',
  computed: {
    classChoose: function () {
      if(this.todo.done) return 'todo-status done';
      else return 'todo-status undone'
    },
    moneyChoose: function () {
      if(this.todo.money == -1) return '';
      else return this.todo.money;
    }
  },
  methods: {
    updateStatus: function () {
      this.$emit('update-status', this.todo)
      console.log('click activate')
    }
  },
  created() {
    //console.log(this.peopleList)
  }
})

$(document).ready(() => {

  var todolist = new Vue({
    el: '#todolist',
    data: {
      jobs: [
        {id:0, name: "test1", money:-1, done: false},
        {id:1, name: "test2", money:100, done: true}
      ],
      newName: '',
      max_id: 1,
      peopleList: ['John', 'Pat']
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
