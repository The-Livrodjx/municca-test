import { Request, Response } from 'express';
import { DocumentsService } from '../services/DocumentsService';

const documentsService = new DocumentsService();

class DocumentsController {

  async create(request: Request, response: Response) {
    const {id} = request.params; // id => userId
    const { name, status } = request.body;

    try {
      const newDocument = await documentsService.create(Number(id), {
        name, 
        status
      });
  
      return response.json(newDocument);
    }catch(err) {
      console.log(err);
      return response.status(406).json({
        msg: "Document already exists"
      });
    }
  }

  async findAll(_: any, response: Response) {
    const documents = await documentsService.findAll();

    if (!documents.length) return response.status(404).json({
      msg: "None Document was found"
    });

    return response.json(documents);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const document = await documentsService.findById(Number(id));

    if (!document) return response.status(404).json({
      msg: "None document was found"
    });

    return response.json(document);
  }

  async findByUserId(request: Request, response: Response) {
    const { id } = request.params;
    const document = await documentsService.findByUserId(Number(id));

    if (!document.length) return response.status(404).json({
      msg: "None document was found using user id"
    });

    return response.json(document);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const document = await documentsService.update(Number(id), request.body);

    if (!document) return response.status(404).json({
      msg: "None document was found"
    });

    return response.json(document);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await documentsService.delete(Number(id));
      return response.json({
        msg: "The document was deleted successfully"
      });
    } catch (err) {
      return response.status(404).json({
        msg: "None document was found"
      });
    }
  }
}

export { DocumentsController };