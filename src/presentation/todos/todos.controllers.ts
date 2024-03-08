import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



const todos = [
  { id: 1, text: 'Todo 1', completedAt: new Date() },
  { id: 2, text: 'Todo 2', completedAt: null },
  { id: 3, text: 'Todo 3', completedAt: new Date() },
]

export class TodosController {
  constructor() { }

  public getAllTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  }



  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });

    (todo) ? res.json(todo) : res.status(404).json({ error: `Todo with id ${id} not found` });
  }



  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    console.log(createTodoDto);


    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    })

    res.json(newTodo);
  }



  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: Number(id)
    });
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id)
      },
      data: updateTodoDto!.values
    })

    // if (!text) return res.status(400).json({ error: 'Text argument is required' });

    res.json(updatedTodo);
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) return res.status(400).json({ error: 'ID argument is not a number' });
    const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const deleted = await prisma.todo.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({ todo, deleted });
  }
}
