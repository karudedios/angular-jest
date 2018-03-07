import angular from 'angular';
import TodoList from './TodoList/index';
import TodoItem from './TodoItem/index';
import servicesModuleName from '../services';
import CreateTodoItem from './CreateTodoItem/index';

export default angular.module('jest-webpack-app.components', [
  servicesModuleName
])
  .component('todoList', TodoList)
  .component('todoItem', TodoItem)
  .component('createTodoItem', CreateTodoItem)
  .name;
