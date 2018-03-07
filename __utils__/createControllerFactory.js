export default function(controllerName, cb) {

  return function($componentController) {

    cb(function(params) {

      const controller = $componentController(controllerName, null, params);

      controller.$onInit && controller.$onInit();

      return controller;

    });

  };

}
