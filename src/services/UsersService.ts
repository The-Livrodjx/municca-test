import { PrismaClient, Prisma  } from '@prisma/client'
import { Users } from '../dto/users.dto';

const prisma = new PrismaClient()

class UsersService {
  private readonly usersRepository = prisma.user;

  async create(body: {name: string, email: string}): Promise<Users> {
    const {name, email} = body;
    const userExists = await this.usersRepository.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = await this.usersRepository.create({
      data: {
        name,
        email,
      },
    });

    return newUser;
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.findMany();
  }

  async findById(id: number): Promise<Users | null> {
    return await this.usersRepository.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findUnique({
      where: { email },
    });
  }

  async update(id: number, data: Partial<{ name: string; email: string }>): Promise<Users> {
    return await this.usersRepository.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete({
      where: { id },
    });
  }
}

export { UsersService };
