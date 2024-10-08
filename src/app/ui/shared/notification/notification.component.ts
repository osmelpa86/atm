import {Component, Inject, OnInit} from '@angular/core'
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar"
import {NotificationData} from "./notification-data"
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HighlighTitleSearchPipe} from './highligh-title-search.pipe';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.scss' ],
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, MatTooltipModule, HighlighTitleSearchPipe
  ],
})
export class NotificationComponent implements OnInit {

  constructor(
    public sbRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData) { }

  ngOnInit(): void {
  }

  public getInnerHtml(element: any) {
    return `<div>${element}</div>`;
  }
}
