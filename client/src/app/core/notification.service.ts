import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable()
export class NotificatorService {
  public constructor(private readonly notificator: NotificationService) {}

  public show(message: string, style: 'none' | 'success' | 'warning' | 'error' | 'info') {
    return this.notificator.show({
        content: message,
        hideAfter: 1000,
        cssClass: 'button-notification',
        animation: { type: 'fade', duration: 400 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: style, icon: true },
    });
  }

}
