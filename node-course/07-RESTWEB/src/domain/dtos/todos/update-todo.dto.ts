

export class UpdateTodoDTO {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values(){
        const returnObj: {[key: string]:any} = {};
        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt
        return returnObj
    }

    static create( props: {[key: string]: any}): [string?, UpdateTodoDTO?] {

        const {id, text, completedAt} = props;
        if (!id || isNaN(Number(id))){
            return ['id must be a valid number']
        }
        const newCompletedAt = completedAt
        if (completedAt ) {
            const newCompletedAt = new Date()
            if ( newCompletedAt.toString() === 'Invalidad Date'){
                return ['Completed at must be a valid date.']
            }
        }
        return [undefined, new UpdateTodoDTO(id, text, newCompletedAt)]
    }
}