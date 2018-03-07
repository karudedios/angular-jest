import angular from 'angular';
import applicationConfig from './config';
import servicesModuleName from './services';
import componentsModuleName from './components';

export default angular.module('jest-webpack-app', [
  servicesModuleName,
  componentsModuleName,

  'ui.router'
]).config(applicationConfig);
