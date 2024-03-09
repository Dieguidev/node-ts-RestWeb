import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository,
  ) { }

  public getAllTodos = async (req: Request, res: Response) => {

    const todos = await this.todoRepository.getAll();
    res.json(todos);
  }



  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await this.todoRepository.getById(Number(id));
      res.json(todo);

    } catch (error) {

      res.status(400).json({error})
    }
  }



  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const newTodo = await this.todoRepository.create(createTodoDto!);

    res.json(newTodo);
  }



  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: Number(id)
    });
    if (error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.update(updateTodoDto!);



    res.json(updatedTodo);
  }


  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await this.todoRepository.delete(Number(id));

    res.json(deleted );
  }
}
