import './todo-list.styl';
import * as R from 'ramda';

class TodoListController {
  constructor(TodoService, $scope) {
    Object.assign(this, { TodoService, $scope });
  }

  $onInit() {
    if (!this.todos) {

      this.todos = [];

    }
  }

  addTodo = (payload) => {
    return this.TodoService.new(payload).then(todo => {
      this.todos.push(todo);

      this.$scope.$apply();

      return R.last(this.todos);
    });
  }

  updateTodo = (id, payload) => {
    return this.TodoService.update(id, payload).then(todo => {
      const index = R.findIndex(R.propEq('id', id), this.todos);

      this.todos.splice(index, 1, todo);

      this.$scope.$apply();

      return R.find(R.propEq('id', id), this.todos);
    });
  }

  removeTodo = ({ id }) => {
    return this.TodoService.delete(id).then(() => {

      const index = R.findIndex(R.propEq('id', id), this.todos);

      this.todos.splice(index, 1);

      this.$scope.$apply();

      return true;

    }).catch(() => {
      return false;

    });
  }
}

export default {
  bindings: {
    todos: '<',
  },

  controllerAs: 'todoList',
  controller: TodoListController,

  template: require('./todo-list.tpl.html')
};
