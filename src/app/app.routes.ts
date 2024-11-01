import { Routes } from '@angular/router';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'currency-selector',
        pathMatch: 'full'
    },
    {
        path: 'currency-selector',
        component: CurrencySelectorComponent
    },
];
