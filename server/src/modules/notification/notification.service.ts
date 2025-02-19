import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/database/entities/notification.entity';
import { EntityManager, Repository } from 'typeorm';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findManyByUserId(userId: string) {
    return await this.notificationRepository.findBy({
      user: {
        id: userId,
      },
    });
  }

  async findThrowById(id: string) {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async create(payload: CreateNotificationDto, manager?: EntityManager) {
    const notification = this.notificationRepository.create({
      ...payload,
      user: payload.userId,
    });
    return manager
      ? manager.save(Notification, notification)
      : await this.notificationRepository.save(notification);
  }

  async update(id: string, payload: UpdateNotificationDto, userId: string) {
    await this.accessNotification(id, userId);
    return await this.notificationRepository.update(id, payload);
  }

  async delete(id: string, userId: string) {
    await this.accessNotification(id, userId);
    return await this.notificationRepository.delete({ id });
  }

  async accessNotification(id: string, userId: string) {
    const access = this.notificationRepository.exists({
      where: {
        id: id,
        user: {
          id: userId,
        },
      },
    });
    if (!access) {
      throw new ForbiddenException('User notification access denied');
    }
    return access;
  }
}
