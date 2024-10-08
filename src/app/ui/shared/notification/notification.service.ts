import {inject, Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {NotificationData} from "./notification-data";
import {NotificationComponent} from "./notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public snackBar = inject(MatSnackBar);
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };

  constructor() {
  }

  success(msg: string, position: { h: MatSnackBarHorizontalPosition, v: MatSnackBarVerticalPosition }, d?: number) {
    this.config.horizontalPosition = position.h;
    this.config.verticalPosition = position.v;
    this.config.duration = d === undefined ? 3000 : d;
    this.config.panelClass = ['success', 'notification'];
    this.snackBar.open(msg, '', this.config);
  }

  error(msg: string, position?: { h: MatSnackBarHorizontalPosition, v: MatSnackBarVerticalPosition }, d?: number) {
    this.config.horizontalPosition = position!.h;
    this.config.verticalPosition = position!.v;
    this.config.duration = d === undefined ? 3000 : d;
    this.config.panelClass = ['danger', 'notification'];
    this.snackBar.open(msg, '', this.config);
  }

  openFromComponent(msg: NotificationData,
                    position?: {
                      h: MatSnackBarHorizontalPosition,
                      v: MatSnackBarVerticalPosition
                    },
                    d?: number,
                    style?: string,
                    icon?: string) {
    if (position !== null && position !== undefined) {
      this.config.horizontalPosition = position.h;
      this.config.verticalPosition = position.v;
    }
    this.config.data = msg;
    this.config.duration = d === undefined ? 3000 : d;
    this.config.panelClass = [style!, 'notification'];
    this.snackBar.openFromComponent(NotificationComponent, this.config);
  }
}
