import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: { user: User }) {
    try {
      return this.postService.create({
        ...createPostDto,
        author: { connect: { id: req.user.id } },
      });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.postService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.postService.findOne({ id });
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postService.update({ id }, updatePostDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.postService.remove({ id });
    } catch (error) {
      throw error;
    }
  }
}
