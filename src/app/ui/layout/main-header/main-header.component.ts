import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SharedService} from '../../../core/utils/shared.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <div class="main-logo-container">
        <span class="main-title">ATM</span>
      </div>

      <span class="spacer"></span>

      <div class="balance-container">
        <span class="balance-title">BALANCE: </span><span class="balance-value">$ {{ balance() }}</span>
      </div>
    </mat-toolbar>
  `,
  styleUrl: './main-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  sharedService = inject(SharedService);

  balance = this.sharedService.balance;
}
