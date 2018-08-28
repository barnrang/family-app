String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

Vue.component('v-select', VueSelect.VueSelect);

Vue.component('people-list', {
  template: '<v-select class=\"people-list\" :options=\"peopleList\" label=\"name\">\
    </v-select>',
  computed: {
    peopleList: function () {
      return this.$store.state.peopleList;
    }
  },
  created() {
    console.log(this.peopleList);
  }
})

Vue.component('todo-item', {
  props:['todo'],
  template: '<li class=\'todo-item\'>\
   <span class=\"todo-name\" @click=\"updateName\">{{todo.name}}</span>\
   <span class=\"money-status\" @click=\"updateMoney\">{{moneyChoose}}</span>\
   <span :class=\"classChoose\" @click=\"updateStatus\" ></span>\
   <people-list></people-list>\
   <people-list></people-list>\
   <span class=\"glyphicon glyphicon-trash trash-can\" @click=\"deleteContent\"></span>\
  </li>',
  computed: {
    classChoose: function () {
      if(this.todo.done) return 'todo-status done';
      else return 'todo-status undone'
    },
    moneyChoose: function () {
      if(this.todo.money == 0) return '+';
      else return this.todo.money + '¥';
    }
  },
  methods: {
    updateStatus: function () {
      //this.$emit('update-status', this.todo)
      var todo = this.todo;
      todo.done = !todo.done
      this.$store.commit('updateElement', todo);
      console.log('click activate')
    },
    deleteContent: function () {
      this.$store.commit('deleteElement', this.todo);
      //this.$emit('delete-todo', this.todo)
    },
    updateMoney: function (ev) {
      var $el = $(ev.target);
      var $input = $('<input type=\"number\" class=\"money-status update\"/>').val(this.todo.money == 0 ? '' : this.todo.money);
      $el.replaceWith($input);

      var save = () => {
        var new_text = $input.val();
        var next_money = 0;
        if (!new_text.isEmpty()) next_money = parseInt(new_text);
        //this.$emit('update-money', {id:this.todo.id, money:next_money})
        var todo = this.todo
        todo.money = next_money;
        this.$store.commit('updateElement', todo);
        $input.replaceWith($el);
      }

      $input.one('blur enter', save).focus();
      $input.keyup(function(e){
        if(e.keyCode == 13)
        {
            save();
        }
      }).focus();
    },
    updateName: function (ev) {
      console.log(ev.target);
      var $el = $(ev.target);
      var prev_name = this.todo.name;
      var $input = $('<input type=\"text\" class=\"todo-name update\"/>').val(prev_name);
      $el.replaceWith($input);

      var save = () => {
        var new_text = $input.val();
        var next_name = '';
        if (new_text.isEmpty()) next_name = prev_name;
        else next_name = new_text;
        var todo = this.todo
        todo.name = next_name;
        this.$store.commit('updateElement', todo);
        $input.replaceWith($el);
      }

      $input.one('blur enter', save).focus();
      $input.keyup(function(e){
        if(e.keyCode == 13)
        {
            save();
        }
      }).focus();
    }
  },
  created() {
    console.log(this.$store.state)
  }
})

$(document).ready(() => {

  var todolist = new Vue({
    el: '#todolist',
    data: {
      newName: '',
    },
    store,
    methods: {
      submit: function () {
        console.log("add item")
        if(!this.newName.isEmpty()){
          this.$store.state.max_id++;
          this.$store.commit('addElement', {id: this.$store.state.max_id, name:this.newName, money: 0, done: false});
          this.newName = ''
        }
      }
    },

    computed: {
      jobs () {
        return this.$store.state.jobs;
      }
    },
  })

  var analyzer = new Vue({
    el: '#analyzer',
    data: {},
    store,

    computed: {
      payList: function () {
        var done_task_withm = this.$store.state.jobs.filter(x => x.done & (x.money != 0) & x.resp != x.acted);
        var task_list = done_task_withm.map((x, i) => {
          return {id:i, name: x.resp + '→' + x.acted, money:x.money, done:false}
        })
        return task_list;
      }
    }
  })


})
