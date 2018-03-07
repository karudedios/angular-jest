export default function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({
    enabled: true,
    requrieBase: true
  });

  $stateProvider
    .state('root', {
      url: ''
    })
    .state('root.todos', {
      url: '/',
      component: 'todoList',

      resolve: {
        todos: (TodoService) => {
          'ngInject';

          return TodoService.all();
        }
      }
    });
}
