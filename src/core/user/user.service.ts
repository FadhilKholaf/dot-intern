import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma.service';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({
        data: { ...data, password: hashSync(data.password, 12) },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({ include: { posts: true } });
    } catch (error) {
      throw error;
    }
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    try {
      return await this.prisma.user.findUnique({ where });
    } catch (error) {
      throw error;
    }
  }

  async findOneByUsername(where: Prisma.UserWhereInput) {
    try {
      return await this.prisma.user.findFirst({ where });
    } catch (error) {
      throw error;
    }
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserCreateInput,
  ) {
    try {
      return await this.prisma.user.update({
        where,
        data: { ...data, password: hashSync(data.password, 12) },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    try {
      return await this.prisma.user.delete({ where });
    } catch (error) {
      throw error;
    }
  }
}
