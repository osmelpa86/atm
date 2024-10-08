import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {CacheStorageService} from '../../../core/utils/cache-storage.service';
import {NotificationService} from '../../shared/notification/notification.service';
import {CustomValidations} from '../../../core/validators/custom-validations';
import {Balance} from '../model/balance';
import moment from 'moment';
import {History} from '../model/history';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {SharedService} from '../../../core/utils/shared.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterLink,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent implements OnInit {
  cacheStorageService = inject(CacheStorageService);
  private notificationService = inject(NotificationService);
  private formBuilder = inject(FormBuilder);
  sharedService = inject(SharedService);

  depositForm: any;

  displayedColumns: string[] = ['date', 'amount'];
  history: History[] = [];
  dataSource = new MatTableDataSource<History>();

  ngOnInit(): void {
    this.initializeForm();
    this.loadData()
  }

  loadData() {
    this.history = this.cacheStorageService.get("depositHistory");
    this.dataSource.data = this.history;
  }

  initializeForm() {
    this.depositForm = this.formBuilder.group({
      deposit: [
        null,
        Validators.compose([
          Validators.required,
          CustomValidations.entryDeposit(5000),
        ]),
      ],
    });
  }

  depositAction() {
    if (this.depositForm.invalid) {
      return;
    }

    const balance: Balance = this.cacheStorageService.get("balance");
    const date = moment(new Date()).format('YYYY-MM-DD');
    balance.amount += this.deposit.value;
    this.cacheStorageService.set("balance", balance);
    this.sharedService.updateBalance(balance.amount);

    const depositHistory: History[] = this.cacheStorageService.get("depositHistory") || [];
    depositHistory.push({
      date: date,
      amount: this.deposit.value
    });
    this.cacheStorageService.set("depositHistory", depositHistory);

    this.notificationService.openFromComponent(
      {
        title: '',
        message: "Depósito realizado con éxito",
        icon: 'info',
        search: '',
      },
      undefined,
      9000,
      'success-snackbar'
    );
    this.loadData();
    this.clear();
  }

  get deposit() {
    return this.depositForm.get('deposit');
  }

  clear() {
    this.depositForm.reset();
  }
}
