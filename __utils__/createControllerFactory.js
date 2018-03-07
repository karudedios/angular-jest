export default function(controllerName, cb) {

  return function($componentController, $rootScope, $compile) {

    cb(function(params) {

      const controller = $componentController(controllerName, null, params);

      controller.$onInit && controller.$onInit();

      return controller;

    }, function(elementName, props = {}) {
        const scope = $rootScope.$new();
        const keys = Object.keys(props);
        Object.assign(scope, props);

        const htmlElementName = camelCaseToDashCase(elementName);

        const htmlProps = keys.map(key => {
          return `${camelCaseToDashCase(key)}="${key}"`
        }, '').join(' ');

        const element = $compile(`<${htmlElementName} ${htmlProps}></${htmlElementName}>`)(scope);

        scope.$apply(); // Make sure we actually perform any HTML change

        return element;

        function camelCaseToDashCase(str) {
          return str.replace(/[A-Z]/g, $1 => `-${$1.toLowerCase()}`);
        }

    });

  };

}
