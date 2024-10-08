import {Routes} from '@angular/router';
import {DepositComponent} from '../../ui/operations/deposit/deposit.component';
import {ExtractionComponent} from '../../ui/operations/extraction/extraction.component';
import {MainContainerComponent} from '../../ui/layout/main-container/main-container.component';

export const routes: Routes = [
    {
        path: '',
        component: MainContainerComponent,
        providers: [],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'deposit',
            },
            {
                path: 'deposit',
                component: DepositComponent,
            },
            {
                path: 'extraction',
                component: ExtractionComponent
            }
        ],
    },
];
