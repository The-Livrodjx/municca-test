import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

const usersService = new UsersService();

class UsersController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    try {
      const newUser = await usersService.create({
        name, email
      });
  
      return response.json(newUser);
    }catch(err) {
      return response.status(406).json({
        msg: "User already exists"
      });
    }
  }

  async findAll(_: any, response: Response) {
    const users = await usersService.findAll();

    if (!users.length) return response.status(404).json({
      msg: "None users was found"
    });

    return response.json(users);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const user = await usersService.findById(Number(id));

    if (!user) return response.status(404).json({
      msg: "None user was found"
    });

    return response.json(user);
  }

  async findByEmail(request: Request, response: Response) {
    const { email } = request.query;
    const user = await usersService.findByEmail(String(email));

    if (!user) return response.status(404).json({
      msg: "None user was found"
    });

    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const user = await usersService.update(Number(id), request.body);

    if (!user) return response.status(404).json({
      msg: "None user was found"
    });

    return response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await usersService.delete(Number(id));
      return response.json({
        msg: "The User was deleted successfully"
      });
    } catch (err) {
      return response.status(404).json({
        msg: "None user was found"
      });
    }
  }
}

export { UsersController };