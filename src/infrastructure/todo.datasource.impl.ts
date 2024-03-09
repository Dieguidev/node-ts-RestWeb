import { prisma } from "../data/postgresql";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../domain";



export class TodoDatasourceImpl implements TodoDatasource {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }


  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => TodoEntity.fromObject(todo))
  }



  getById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

}
