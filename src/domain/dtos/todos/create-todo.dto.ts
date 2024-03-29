

export class CreateTodoDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly text: string,
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = props;

    if (!text) return ['text is required', undefined];




    return [undefined, new CreateTodoDto(text)];
  }
}
