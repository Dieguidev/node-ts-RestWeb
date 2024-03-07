import { Request, Response } from "express";

const todos = [
  { id: 1, text: 'Todo 1', completedAt: new Date() },
  { id: 2, text: 'Todo 2', completedAt: null },
  { id: 3, text: 'Todo 3', completedAt: new Date() },
]

export class TodosController {
  constructor() { }

  public getAllTodos = (req: Request, res: Response) => {
    res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find(todo => todo.id === Number(id));

    (todo) ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` });
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'Text argument is required' });

    const newTodo = { id: todos.length + 1, text, completedAt: null };

    todos.push(newTodo);

    res.json(newTodo);
  }

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find(todo => todo.id === Number(id));
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;
    // if (!text) return res.status(400).json({ error: 'Text argument is required' });

    todo.text = text || todo.text;

    (completedAt === 'null')
      ? todo.completedAt = null
      : todo.completedAt = new Date(completedAt || todo.completedAt);

    res.json(todo);
  }

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find(todo => todo.id === Number(id));
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const index = todos.indexOf(todo);
    todos.splice(index, 1);

    res.json(todo);
  }
}
