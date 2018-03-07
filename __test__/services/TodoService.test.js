import * as R from 'ramda';

describe("TodoService", function() {
  let service;

  beforeEach(() => {

    angular.mock.module('jest-webpack-app.services');

  });

  beforeEach(inject(function(TodoService) {

    service = TodoService;

  }));

  afterEach(function() {

    service.__teardown();

  });

  it('should return a new instance of a Todo object on `new` call', async function() {

    const data = { title: 'Hello' };

    const todo = await service.new(data);

    expect(todo.id).toBeDefined();
    expect(todo.completed).toEqual(false);
    expect(todo.title).toEqual(data.title);

  });

  it('should store a new todo on the "datasource" collection', async function() {

    const data = { title: 'Hello' };

    const todo = await service.new(data);
    const todos = await service.all();

    expect(todos.length).toEqual(1);
    expect(R.last(todos)).toEqual(todo);

  });

  it('should allow you to update an existing todo', async function() {

    const data = { title: 'Hello' };
    const titleLens = R.lensProp('title');

    const todo = await service.new(data);
    const updatedTodo = await service.update(todo.id, R.set(titleLens, "Hello 2", todo));

    expect(updatedTodo.id).toEqual(todo.id);
    expect(updatedTodo.title).toEqual('Hello 2');
    expect(updatedTodo.completed).toEqual(todo.completed);

  });

  it('should allow you to delete existing todos', async function() {

    const data = { title: 'Hello '};

    const todo = await service.new(data);

    const deleted = await service.delete(todo.id);

    const allTodos = await service.all();

    expect(deleted).toEqual(true);
    expect(allTodos.length).toEqual(0);

  });

  it('should throw an error if todo id does not exist when trying to update', async function() {

    try {

      await service.update(1, {});

    } catch(e) {

      expect(e.message).toEqual('Todo not found');

    }

  });

  it('should throw an error if todo id does not exist when trying to delete', async function() {

    try {

      await service.delete(1);

    } catch(e) {

      expect(e.message).toEqual('Todo not found');

    }

  });

});
