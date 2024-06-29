import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput) {
    try {
      return this.prisma.post.create({ data });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.prisma.post.findMany({ include: { author: true } });
    } catch (error) {
      throw error;
    }
  }

  findOne(where: Prisma.PostWhereUniqueInput) {
    try {
      return this.prisma.post.findUnique({ where });
    } catch (error) {
      throw error;
    }
  }

  update(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput) {
    try {
      return this.prisma.post.update({ where, data });
    } catch (error) {
      throw error;
    }
  }

  remove(where: Prisma.PostWhereUniqueInput) {
    try {
      return this.prisma.post.delete({ where });
    } catch (error) {
      throw error;
    }
  }
}
