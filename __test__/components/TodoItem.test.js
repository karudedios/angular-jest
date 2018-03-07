import * as R from 'ramda';
import createControllerFactory from '../../__utils__/createControllerFactory';

describe('TodoItem', function() {

  let createController;

  beforeEach(() => {

    angular.mock.module('jest-webpack-app.components');

  });

  beforeEach(inject(createControllerFactory('todoItem', creator => {

    createController = creator;

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

});
