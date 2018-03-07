import * as R from 'ramda';
import { Todo } from 'models';
import Promise from 'bluebird';

const todos = [
  Todo.new("Learn Jest", true),
  Todo.new("Learn React", true),
  Todo.new("Learn AngularJS", true),
  Todo.new("Take over the world!", false),
  Todo.new("Figure out how much wood I'd chuck as a woodchuck", false),
];

export default class TodoService {
  all = () => {
    return Promise.resolve( todos.slice(0) );
  };

  new = ({ title, completed } = { }) => {
    if (!title) {
      return Promise.reject(new Error("Cannot add empty todo title"));
    }

    todos.push(Todo.new(title, completed));

    return Promise.resolve(R.last(todos));
  };

  findById = (id) => {
    const index = R.findIndex(R.propEq('id', id), todos);

    if (index === -1) {
      return Promise.resolve(null);
    }

    return Promise.resolve(todos[index]);
  };

  update = (id, { title, completed }) => {
    return this.findById(id).then(function (todo) {

      if (!todo) {
        return Promise.reject(new Error("Todo not found"));
      }

      const index = todos.indexOf(todo);

      const titleLens = R.lensProp('title');
      const completedLens = R.lensProp('completed');

      const updatedTodo = R.set(completedLens, completed, R.set(titleLens, title, todo));

      todos.splice(index, 1, updatedTodo);

      return Promise.resolve(updatedTodo);

    });
  };

  delete = (id) => {
    return this.findById(id).then(function(todo) {

      if (!todo) {
        return Promise.reject(new Error("Todo not found"));
      }

      const index = todos.indexOf(todo);
      todos.splice(index, 1);

      return Promise.resolve(true);

    });
  };

  // Unit Testing Helpers
  __teardown() {
    todos.splice(0, todos.length);
  }
}
