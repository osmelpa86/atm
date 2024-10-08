import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CacheStorageService} from '../../../core/utils/cache-storage.service';
import {NotificationService} from '../../shared/notification/notification.service';
import {History} from '../model/history';
import {CustomValidations} from '../../../core/validators/custom-validations';
import {Balance} from '../model/balance';
import moment from 'moment/moment';
import {SharedService} from '../../../core/utils/shared.service';

@Component({
  selector: 'app-extraction',
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
  templateUrl: './extraction.component.html',
  styleUrl: './extraction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtractionComponent implements OnInit {
  cacheStorageService = inject(CacheStorageService);
  private notificationService = inject(NotificationService);
  private formBuilder = inject(FormBuilder);
  sharedService = inject(SharedService);

  extractionForm: any;

  displayedColumns: string[] = ['date', 'amount'];
  history: History[] = [];
  dataSource = new MatTableDataSource<History>();

  ngOnInit(): void {
    this.initializeForm();
    this.loadData()
  }

  loadData() {
    this.history = this.cacheStorageService.get("extractHistory");
    this.dataSource.data = this.history;
  }

  initializeForm() {
    this.extractionForm = this.formBuilder.group({
      extraction: [
        null,
        Validators.compose([
          Validators.required,
          CustomValidations.entryExtraction(7500, () => this.getBalance()),
        ]),
      ],
    });
  }

  getBalance(): number {
    return this.cacheStorageService.get("balance").amount;
  }

  extractionAction() {
    if (this.extractionForm.invalid) {
      return;
    }

    const balance: Balance = this.cacheStorageService.get("balance");
    const date = moment(new Date()).format('YYYY-MM-DD');
    balance.amount -= this.extraction.value;
    this.cacheStorageService.set("balance", balance);
    this.sharedService.updateBalance(balance.amount);

    const extractionHistory: History[] = this.cacheStorageService.get("extractHistory") || [];
    extractionHistory.push({
      date: date,
      amount: this.extraction.value
    });
    this.cacheStorageService.set("extractHistory", extractionHistory);

    this.notificationService.openFromComponent(
      {
        title: '',
        message: "Extracción realizada con éxito",
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

  get extraction() {
    return this.extractionForm.get('extraction');
  }

  clear() {
    this.extractionForm.reset();
  }
}
