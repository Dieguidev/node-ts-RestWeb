import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetAllTodo, GetTodo, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository,
  ) { }

  public getAllTodos = (req: Request, res: Response) => {
    new GetAllTodo(this.todoRepository)
      .execute()
      .then(todos => res.json(todos))
      .catch(error => res.status(400).json({ error }));
  }



  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    new GetTodo(this.todoRepository)
      .execute(Number(id))
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));
  }



  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then(todo => res.status(201).json(todo))
      .catch(error => res.status(400).json({ error }));
  }



  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: Number(id)
    });
    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));
  }


  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteTodo(this.todoRepository)
      .execute(Number(id))
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));
  }
}
