import {inject, Injectable, signal} from '@angular/core';
import {CacheStorageService} from './cache-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cacheStorageService = inject(CacheStorageService);

  balance = signal(this.getBalanceFromCache());

  updateBalance(newBalance: number): void {
    this.balance.set(newBalance);
    this.setBalanceInCache(newBalance);
  }

  private getBalanceFromCache(): number {
    const balanceData = this.cacheStorageService.get('balance');
    return balanceData ? balanceData.amount : 0;
  }

  private setBalanceInCache(newBalance: number): void {
    this.cacheStorageService.set('balance', { amount: newBalance });
  }
}
