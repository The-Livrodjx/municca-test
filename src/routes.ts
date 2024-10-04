/* Para entender os payloads, parâmetros ou queries esperadas, importe a collection 
municca-collections.json no seu Insomnia ou então no Postman */

import {Router} from 'express'
import { UsersController } from './controllers/UsersController';
import { DocumentsController } from './controllers/DocumentsController';

const routes = Router();
const usersController = new UsersController();
const documentsController = new DocumentsController();


// Routes for Users
routes.post("/users/create", usersController.create);
routes.get("/users", usersController.findAll);
routes.get("/users/email", usersController.findByEmail);
routes.get("/users/:id", usersController.findById);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.delete);

// Routes for Documents
routes.post("/documents/create/:id", documentsController.create);
routes.get("/documents", documentsController.findAll);
routes.get("/documents/user/:id", documentsController.findByUserId);
routes.get("/documents/:id", documentsController.findById);
routes.put("/documents/:id", documentsController.update);
routes.delete("/documents/:id", documentsController.delete);

export { routes };