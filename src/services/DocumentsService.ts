import { PrismaClient, Prisma } from '@prisma/client'
import { Documents } from '../dto/documents.dto';

const prisma = new PrismaClient()

class DocumentsService {
  private documentsRepository = prisma.document
  private readonly usersRepository = prisma.user;

  async getDocuments(userId: number): Promise<Documents[]> {
    return await this.documentsRepository.findMany({
      where: { userId },
    });
  }

  async create(
    userId: number, 
    documentData: Documents
  ): Promise<Documents> {
    const user = await this.usersRepository.findUnique({
      where: { id: userId },
      include: { documents: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const documentExists = await this.documentsRepository.findMany({
      where: {
        name: documentData.name
      },
      take: 1
    });

    if(documentExists.length) {
      throw new Error('Document already exists');
    }

    return await this.documentsRepository.create({
      data: {
        ...documentData,
        userId,
      }
    });
  }

  async findAll(): Promise<Documents[]> {
    return await this.documentsRepository.findMany();
  }

  async findById(id: number): Promise<Documents | null> {
    return await this.documentsRepository.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<Documents[]> {
    return await this.documentsRepository.findMany({
      where: { userId },
    });
  }

  async update(id: number, data: Partial<Prisma.DocumentUpdateInput>): Promise<Documents> {
    return await this.documentsRepository.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.documentsRepository.delete({
      where: { id },
    });
  }
}

export { DocumentsService };
