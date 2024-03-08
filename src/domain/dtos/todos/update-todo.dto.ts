

export class UpdateTodoDto {
  //private contructor solo se puede llamar dentro de un metodo estatico
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt?: Date,
  ) { }


  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;  // {text: this.text, completedAt: this.completedAt}

  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['Invalid completedAt date'];
      }
    }
    if (!id || isNaN(Number(id))) return ['ID must be a valid number'];

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
