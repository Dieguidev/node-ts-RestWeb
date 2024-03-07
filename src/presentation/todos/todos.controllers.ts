import { Request, Response } from "express";

const todos = [
  { id: 1, text: 'Todo 1' },
  { id: 2, text: 'Todo 2' },
  { id: 3, text: 'Todo 3' },
]

export class TodosController {
  constructor() {}

  public getAllTodos = (req: Request, res: Response) => {
    res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) return res.status(400).json({error: 'ID argument is not a number'})

    const todo = todos.find(todo => todo.id === Number(id));

    (todo) ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` });
  }
}
