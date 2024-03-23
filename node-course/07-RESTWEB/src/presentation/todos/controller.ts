import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDTO } from '../../domain/dtos/todos/create-todo-.dto';
import { UpdateTodoDTO } from '../../domain/dtos/todos/update-todo.dto';

export class TodosController {

    //* DI
    constructor(){
    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()      
        return res.json(todos);
    }

    public getTodoById = async ( req: Request, res: Response ) => {
        const id = +req.params.id;  //Plus sign makes string conversion
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = await prisma.todo.findFirst({
            where: {id}
        })
        res.json(todo)
    }

    public createTodo = async (  req: Request, res: Response ) => {
        const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
        if ( error ) return res.status(400).json({error})
        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });
        res.json(todo)

    }

    public updateTodo = async ( req: Request, res: Response ) => {
        const id = +req.params.id;  //Plus sign makes string conversion
        const [error, updateTodoDto] = UpdateTodoDTO.create({...req.body, id})
        if ( error ) return res.status(400).json({error})
        const todo = await prisma.todo.findFirst({
            where:{id}
        })
        if ( !todo ) return res.status(404).json({ error: 'ID not found'})
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
        })
        res.json( updatedTodo )
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number'})
        const todo = await prisma.todo.findFirst({
            where: {id}
        })
        if ( !todo ) return res.status(404).json({ error: 'ID not found'})

        const deletedTodo = await prisma.todo.delete({
            where: {id}
        });

        (deletedTodo) 
            ? res.json(deletedTodo)
            : res.status(400).json({ error: `Todo with id ${id} does not exist.`})

    }
}