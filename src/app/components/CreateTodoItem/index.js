import './create-todo-item.styl';

const defaultState = () => ({ todo: {}, required: false });

class CreateTodoItemController {
  state = defaultState();

  requestTodoCreation() {
    if (!this.state.todo.title) return;

    this.onCreateRequest({ $todo: this.state.todo });

    this.state = defaultState();
  }

  onFocus = () => this.state.required = true;

  onBlur = () => this.state.required = false;
}

export default {
  bindings: {
    onCreateRequest: '&',
  },

  controllerAs: 'createTodoItem',
  controller: CreateTodoItemController,

  template: `
    <form name="createTodoForm" ng-submit="::createTodoItem.requestTodoCreation()">
      <input
        type="text"
        placeholder="What do you want to do?"
        data-ng-blur="createTodoItem.onBlur()"
        data-ng-focus="createTodoItem.onFocus()"
        data-ng-model="createTodoItem.state.todo.title"
        data-ng-required="createTodoItem.state.required" />
    </form>
  `
};
