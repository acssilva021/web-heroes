import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import {
  HeroService,
  type CreateHeroDTO,
  type UpdateHeroDTO,
} from '../service/hero.service';
import { HeroEntity } from '../domain/hero.entity';

@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  findAll(): HeroEntity[] {
    return this.heroService.getAllHeroes();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): HeroEntity {
    try {
      return this.heroService.getHeroById(id);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body() body: CreateHeroDTO): HeroEntity {
    try {
      return this.heroService.create(body);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHeroDTO,
  ): HeroEntity {
    try {
      return this.heroService.update(id, body);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id/toggle-status')
  toggleStatus(@Param('id', ParseIntPipe) id: number): HeroEntity {
    try {
      return this.heroService.toggleHeroStatus(id);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): void {
    try {
      this.heroService.delete(id);
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }
}