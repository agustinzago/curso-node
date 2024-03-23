

export class CreateTodoDTO {

    private constructor(
        public readonly text: string,
    ){}

    static create( props: {[key: string]: any}): [string?, CreateTodoDTO?] {

        const {text} = props;
        if (!text ) return ['Text property id required', undefined];

        return [undefined, new CreateTodoDTO(text)]
    }
}