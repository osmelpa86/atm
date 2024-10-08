import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
  ],
  template: `
    <mat-toolbar color="primary" class="main-menu-toolbar">
      <nav class="main-menu-nav">
        <a
          mat-button
          routerLinkActive="active-menu-item"
          routerLink="/deposit"
        >
          Deposito
        </a>

        <a
          mat-button
          routerLinkActive="active-menu-item"
          routerLink="/extraction"
        >
          Extracciones
        </a>
      </nav>
    </mat-toolbar>
  `,
  styleUrl: './main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
}
