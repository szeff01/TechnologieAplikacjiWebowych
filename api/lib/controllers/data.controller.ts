import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [5,4,3,6,3,7,5,7,5,13,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getId); 
        this.router.post(`${this.path}`, this.addData); 
        this.router.delete(`${this.path}/:id`, this.deleteData); 
        this.router.post(`${this.path}/:num`, this.getManyData); 
        this.router.get(`${this.path}`, this.getAll); 
        this.router.delete(`${this.path}`, this.deleteAll); 

    }


    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);

    }


    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        if (elem === null || elem === undefined) {
            return response.status(400).json({ error: "Bad request." });
        }

        testArr.push(elem);

        response.status(200).json(testArr);

    }


    private getId = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        if (! Number.isInteger(Number(id)) || Number(id) >= testArr.length || Number(id) < 0) {
            return response.status(404).json({ error: "Not found." });
        }

        response.status(200).json(testArr[Number(id)]);
    }

    private deleteData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        if (! Number.isInteger(Number(id)) || Number(id) >= testArr.length || Number(id) < 0) {
            return response.status(404).json({ error: "Not found." });
        }

        testArr = testArr.filter((elem, index) => index !== Number(id));


        response.status(200).json(testArr);
    }

    private getManyData = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;

        if (!Number.isInteger(Number(num)) || Number(num) >= testArr.length || Number(num) < 0) {
            return response.status(404).json({ error: "Not found." });
        }

        const slicedArray = testArr.slice(0, Number(num));
        response.status(200).json(slicedArray);
    }

    
    private deleteAll = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        response.status(200).json(testArr);
    }
}

export default PostController;
