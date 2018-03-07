import createControllerFactory from '../../__utils__/createControllerFactory';

describe('CreateTodoItem', function() {

  let createController;

  beforeEach(() => {

    angular.mock.module('jest-webpack-app.components');

  });

  beforeEach(inject(createControllerFactory('createTodoItem', creator => {

    createController = creator;

  })));

  it('should prevent calling onCreateRequest callback if todo title is empty', function() {

    const controller = createController({
      onCreateRequest: jest.fn()
    });

    controller.requestTodoCreation();

    expect(controller.onCreateRequest).not.toBeCalled();

  });

  it('should call onCreateRequest callback if todo has a title', function() {

    const controller = createController({
      onCreateRequest: jest.fn()
    });

    const todo = { title: "Hello World!" };

    controller.state.todo.title = todo.title;

    // state.todo gets cleared during this call
    controller.requestTodoCreation();

    expect(controller.onCreateRequest).toBeCalledWith({ $todo: todo });

  });

  it('should set `required` to true when `onFocus` is called and to false when `onBlur` is called', function() {

    const controller = createController();

    expect(controller.state.required).toEqual(false);

    controller.onFocus();

    expect(controller.state.required).toEqual(true);

    controller.onBlur();

    expect(controller.state.required).toEqual(false);

  });
});
