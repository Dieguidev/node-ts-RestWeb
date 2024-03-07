import { Request, Response } from "express";



export class TodosController {
  constructor() {}

  public getAllTodos = (req: Request, res: Response) => {
    res.json([
      { id: 1, text: 'Todo 1' },
      { id: 2, text: 'Todo 2' },
      { id: 3, text: 'Todo 3' },
    ]);
  }
}
