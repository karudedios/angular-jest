import createControllerFactory from '../../__utils__/createControllerFactory';

describe("TodoList", function() {

  let createController;

  beforeEach(() => {

    angular.mock.module('jest-webpack-app.components');

  });

  beforeEach(inject(createControllerFactory('todoList', creator => {

    createController = creator;

  })));

  it("should work normally if any array is provided", function() {

    const controller = createController({ todos: [] });

    expect(controller.todos).toBeDefined();
    expect(controller.todos.length).toBe(0);

  });

  it("should default to have an empty array if no todos were provided", function() {

    const controller = createController();

    expect(controller.todos).toBeDefined();
    expect(controller.todos.length).toBe(0);

  });

  it("should allow you to add a new todo", async function() {

    const controller = createController();

    await controller.addTodo({ title: "new todo" });

    expect(controller.todos.length).toBe(1);

    expect(controller.todos[0].title).toBe('new todo');

  });

  it("should not allow you to create an empty todo", async function() {

    const controller = createController();

    try {

      await controller.addTodo()

    } catch(e) {

      expect(e.message).toBeDefined();

      expect(e.message).toEqual("Cannot add empty todo title");

    }

  });

  it("should update an existing todo if proper information is provided", async function() {

    const controller = createController();

    const initialData = { title: "new todo" };

    await controller.addTodo(initialData);

    const todo = controller.todos[0];

    const updatedData = Object.assign({}, todo, { title: "new title" });

    await controller.updateTodo(todo.id, updatedData);

    const newTodo = controller.todos[0];

    expect(newTodo.id).toEqual(todo.id);
    expect(newTodo.title).toEqual(updatedData.title);

  });

  it("should allow for todos to be removed if existing id is provided", async function() {

    const controller = createController();

    const initialData = { title: "new todo" };

    await controller.addTodo(initialData);

    const todo = controller.todos[0];

    const removed = await controller.removeTodo({ id: todo.id });

    expect(removed).toEqual(true);
    expect(controller.todos.length).toEqual(0);

  });

  it("should not throw an error if todo id doesn't exist when trying to remove a todo", async function() {

    const controller = createController();

    const initialData = { title: 'new todo' };

    const todo = await controller.addTodo(initialData);

    const failedToRemove = !(await controller.removeTodo({ id: todo.id + 1 }));

    expect(failedToRemove).toEqual(true);
    expect(controller.todos.length).toEqual(1);

  });

});
