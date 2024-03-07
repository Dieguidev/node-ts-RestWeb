import { Router } from "express";
import { TodosController } from "./todos.controllers";



export class TodoRoutes {

  static get routes(): Router {
    const router = Router();
    const todoController = new TodosController();

    router.get('/', todoController.getAllTodos )
    router.get('/:id', todoController.getTodoById)

    return router;
  }
}
