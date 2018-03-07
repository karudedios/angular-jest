import './main.styl';

import $ from 'jquery';
import angular from 'angular';
import application from './app';

$(document).ready(function() {

  const [ app ] = $('[application]');

  angular.bootstrap(app, [ application.name ]);

});
