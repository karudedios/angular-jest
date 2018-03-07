import angular from 'angular';
import TodoService from './TodoService';

export default angular.module('jest-webpack-app.services', [
  'ngResource'
])
  .service('TodoService', TodoService)
  .name;
