import { prisma } from "../../data/postgresql";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    })

    return TodoEntity.fromObject(newTodo);
  }


  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => TodoEntity.fromObject(todo))
  }


  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });

    if (!todo) throw new Error(`Todo with id ${id} not found`);

    return TodoEntity.fromObject(todo);
  }


  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(updateTodoDto.id)
      },
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject(updatedTodo);
  }



  async delete(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const deleted = await prisma.todo.delete({
      where: {
        id: Number(id)
      }
    })

    return TodoEntity.fromObject(deleted)
  }

}
