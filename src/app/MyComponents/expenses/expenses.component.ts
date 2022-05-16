import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/MyServices/expenses.service';
import { delay, Observable } from 'rxjs';
import { Expense } from 'src/app/MyClasses/expense';
import * as moment from 'moment';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  Expenses: Expense[] = [];
  loader: boolean = true;
  errorMsg: string = "";
  constructor(private expensesService: ExpensesService) {

  }

  ngOnInit(): void {

    this.expensesService.getExpenses().subscribe({
      next: (data: any) => {
        this.Expenses = data;
        this.Expenses = this.Expenses.sort((a:Expense,b:Expense)=>{
          return this.convertToDate(a.dateofexpense).getTime()- this.convertToDate(b.dateofexpense).getTime();
        });
      
        this.resetLoader();
      },
      error: (error) => {
        this.resetLoader();
        this.setDisplayBlock(error);
      }
    });

  }
  resetLoader(): void {
    this.loader = !this.loader;
  }


  setDisplayBlock(displayBlock: string): void {
    this.errorMsg = displayBlock;
  }
  
  
  convertToDate(a:string):Date
  {
    a = a.split(' ').join('-');
    return moment(a,"DD-MMMM-YYYY").toDate();
  }

}
