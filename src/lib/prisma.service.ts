import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    await this.$connect()
      .then((result) => {
        this.logger.log('DB Connected');
      })
      .catch((err) => {
        this.logger.log('Error while connecting to db');
      });
  }
}
