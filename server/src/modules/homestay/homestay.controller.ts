import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { HomestayService } from './homestay.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Response } from 'express';

@Controller('homestays')
export class HomestayController {
  constructor(private homestayService: HomestayService) {}

  @Public()
  @Get()
  async getAll(@Res() res: Response) {
    const homestays = await this.homestayService.findAll();
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get homestay list success',
      data: homestays,
    });
  }

  @Public()
  @Get('/:id')
  async getById(@Param() params: { id: string }, @Res() res: Response) {
    const homestay = await this.homestayService.findById(params.id);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get homestay detail success',
      data: homestay,
    });
  }
}
