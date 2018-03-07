import * as R from 'ramda';
import createControllerFactory from '../../__utils__/createControllerFactory';

describe('TodoItem', function() {

  let createElement;
  let createController;

  beforeEach(() => {

    angular.mock.module('jest-webpack-app.components');

  });

  beforeEach(inject(createControllerFactory('todoItem', (controllerCreator, elementCreator) => {

    createElement = elementCreator;
    createController = controllerCreator;

  })));

  it('should default to an empty object when no todo is provided', function() {

    const controller = createController();

    expect(controller.todo).toBeDefined();
    expect(controller.todo).toMatchObject({});

  });

  it('should call `onChangeRequest` function with proper payload when `update` is called', function() {

    const todo = { title: "todo title" };

    const controller = createController({
      todo,
      onChangeRequest: jest.fn(),
    });

    const updatedTodo = R.set(R.lensProp('completed'), true, controller.todo);

    controller.toggleTodo();

    expect(controller.onChangeRequest).toBeCalledWith({ $todo: updatedTodo });

  });

  it('should call `onRemoveRequest` function with proper payload when `delete` is called', function() {

    const todo = { title: 'todo title' };

    const controller = createController({
      todo,
      onRemoveRequest: jest.fn()
    });

    controller.removeTodo();

    expect(controller.onRemoveRequest).toBeCalledWith({ $todo: controller.todo });

  });

  describe("Snapshot Testing", function() {

    it('should render the element when no todo is provided', function() {

      const element = createElement('todoItem');

      expect(element).toBeDefined();
      expect(element[0]).toMatchSnapshot();

    });

    it('should render the element when todo is provided with id', function() {

      const element = createElement('todoItem', {
        todo: {
          id: 5
        }
      });

      expect(element).toBeDefined();
      expect(element[0]).toMatchSnapshot();

    });

    it('should render the element when todo is provided with a title', function() {

      const element = createElement('todoItem', {
        todo: {
          title: "Hello!"
        }
      });

      expect(element).toBeDefined();
      expect(element[0]).toMatchSnapshot();

    });

  });

});
