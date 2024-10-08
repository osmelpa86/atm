import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CacheStorageService} from './core/utils/cache-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  template: ` <router-outlet></router-outlet> `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'atm-front';
  cacheStorageService = inject(CacheStorageService);

  ngOnInit(): void {
    this.cacheStorageService.set("balance", { amount: 0 });
    this.cacheStorageService.set("depositHistory", []);
    this.cacheStorageService.set("extractHistory", []);
  }
}
