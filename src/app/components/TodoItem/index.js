import './todo-item.styl';
import * as R from 'ramda';
import svgDeleteIcon from 'assets/delete_icon.svg';

class TodoItemController {
  constructor(TodoService, $scope) {
    Object.assign(this, { TodoService, $scope });
  }

  $onInit() {
    if (!this.todo) {
      this.todo = {};
    }
  }

  toggleTodo() {
    this.onChangeRequest({
      $todo: R.set(R.lensProp('completed'), !this.todo.completed, this.todo)
    });
  }

  removeTodo() {
    this.onRemoveRequest({ $todo: this.todo });
  }
}

export default {
  bindings: {
    todo: '<',
    onChangeRequest: '&',
    onRemoveRequest: '&',
  },

  controllerAs: 'todoItem',
  controller: TodoItemController,

  template: `
    <div class="todo">
      <input
        type="checkbox"
        id="check-{{ ::todoItem.todo.id }}"
        data-ng-checked="todoItem.todo.completed" />

      <label class="todo-title" data-ng-click="::todoItem.toggleTodo()">
        <h4 data-ng-bind="::todoItem.todo.title"></h4>
      </label>

      <span class="svg-icon delete-icon action small" data-ng-click="::todoItem.removeTodo()">
        ${ svgDeleteIcon }
      </span>
    </div>
  `
};
