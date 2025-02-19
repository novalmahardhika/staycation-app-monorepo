import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ReqUser } from 'src/common/decorators/user.decorator';
import { Response } from 'express';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @ReqUser() user: ReqUser,
    @Res() res: Response,
  ) {
    const { id: userId } = user;
    const notification = await this.notificationService.findThrowById(id);
    await this.notificationService.delete(notification.id, userId);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Delete notifications success',
    });
  }

  @Patch(':id/read')
  async updateRead(
    @Param('id') id: string,
    @ReqUser() user: ReqUser,
    @Res() res: Response,
  ) {
    const { id: userId } = user;
    const notification = await this.notificationService.findThrowById(id);
    await this.notificationService.update(
      notification.id,
      { isRead: true },
      userId,
    );
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Read notifications success',
    });
  }

  @Get('me')
  async getMe(@ReqUser() user: ReqUser, @Res() res: Response) {
    const { id: userId } = user;
    const notifications =
      await this.notificationService.findManyByUserId(userId);
    return res.status(HttpStatus.OK).json({
      status: 'OK',
      message: 'Get notifications success',
      data: notifications,
    });
  }
}
