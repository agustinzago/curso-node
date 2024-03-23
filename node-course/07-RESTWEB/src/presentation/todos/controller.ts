import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDTO } from '../../domain/dtos/todos/create-todo-.dto';
import { UpdateTodoDTO } from '../../domain/dtos/todos/update-todo.dto';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';

export class TodosController {

    //* DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ){
    }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos( this.todoRepository)
            .execute()
            .then( todos => res.json(todos))
            .catch( error => res.status(400).json({error}) )
    }

    public getTodoById = ( req: Request, res: Response ) => {
        const id = +req.params.id
        new GetTodo( this.todoRepository)
            .execute( id )
            .then( todo => res.json(todo))
            .catch( error => res.status(400).json({error}) )
    }

    public createTodo = (  req: Request, res: Response ) => {
        const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
        if ( error ) return res.status(400).json({error})
        new CreateTodo( this.todoRepository)
            .execute( createTodoDTO! )
            .then( todo => res.json(todo))
            .catch( error => res.status(400).json({error}) )
    }

    public updateTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;  //Plus sign makes string conversion
        const [error, updateTodoDto] = UpdateTodoDTO.create({...req.body, id})
        if ( error ) return res.status(400).json({error})
        new UpdateTodo( this.todoRepository)
        .execute( updateTodoDto! )
        .then( todo => res.json(todo))
        .catch( error => res.status(400).json({error}) )
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        new DeleteTodo( this.todoRepository)
            .execute( id )
            .then( todo => res.json(todo))
            .catch( error => res.status(400).json({error}) )
    }
}