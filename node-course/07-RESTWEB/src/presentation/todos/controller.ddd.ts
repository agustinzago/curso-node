import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDTO } from '../../domain/dtos/todos/create-todo-.dto';
import { UpdateTodoDTO } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain';

export class TodosController {

    //* DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ){
    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll()
        return res.json(todos)
    }

    public getTodoById = async ( req: Request, res: Response ) => {
        const id = +req.params.id;  //Plus sign makes string conversion
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = await this.todoRepository.findById(id)
        res.json(todo)
    }

    public createTodo = async (  req: Request, res: Response ) => {
        const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
        if ( error ) return res.status(400).json({error})
        const todo = await this.todoRepository.create( createTodoDTO! )
        res.json(todo)

    }

    public updateTodo = async ( req: Request, res: Response ) => {
        const id = +req.params.id;  //Plus sign makes string conversion
        const [error, updateTodoDto] = UpdateTodoDTO.create({...req.body, id})
        if ( error ) return res.status(400).json({error})
        const updatedTodo = await this.todoRepository.updateById( updateTodoDto!)
        res.json( updatedTodo )
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        const deletedTodo = await this.todoRepository.deleteById( id )
        res.json(deletedTodo)
    }
}