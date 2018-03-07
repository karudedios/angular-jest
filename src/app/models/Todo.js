let lastId = 1;

export class Todo {
  constructor(id, title, completed) {
    Object.assign(this, {
      id,
      title,
      completed
    });
  }

  static new(title, completed = false) {
    return new Todo(lastId++, title, completed);
  }

}
