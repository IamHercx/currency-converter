import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';
import { CurrencyModel } from '../../models/currency.model';
import { QueeryParamsModel } from '../../models/query-params.model';
import { NonNullAssert } from '@angular/compiler';

@Component({
  standalone: true,
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class CurrencySelectorComponent implements OnInit {


  currencyForm!: FormGroup;
  currencies$: Subscription;
  currencies?: CurrencyModel[];
  selectedCurrency = '';

  constructor(
    private currencyService: CurrencyService
  ) {  
    this.currencies$ = this.currencyService.availableCurrencies.subscribe(currencies => {
      this.currencies = currencies;
    });  
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.currencyForm = new FormGroup({
      inputCurrency: new FormControl(null, Validators.required),
      inputSelectCurrency: new FormControl(null,Validators.required),
      outputCurrency: new FormControl(null),
      outputSelectCurrency: new FormControl(null, Validators.required)
    });
  }

  async onSubmit(){
    const queryParams: QueeryParamsModel[] = [
      {
        param: "from",
        value: this.currencyForm.controls['inputSelectCurrency'].value
      },
      {
        param: "to",
        value: this.currencyForm.controls['outputSelectCurrency'].value
      },
      {
        param :"amount",
        value : this.currencyForm.controls['inputCurrency'].value
      }
    ]; 
     const response = await this.currencyService.getCurrencyConversion(queryParams);
     this.currencyForm.controls['outputCurrency'].setValue(Math.round((response.value + Number.EPSILON) * 100) / 100);
  }
}
