import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, ObservableLike, Observer, throwError } from 'rxjs';
import { Expense } from '../MyClasses/expense';
import {Budget }  from '../MyClasses/budget';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {


  url :string="https://www.finapp-backend.in/" ; 

  constructor(private http : HttpClient) { }
  

  getExpenses():Observable<Expense[]> /* To Display  the current month expenses */
  {
    return  this.http.get<any>(this.url+'getExpensesOfCurrentMonth').pipe(delay(100),catchError(
      (err)=>{
        let errorMsg:string = '';
        errorMsg = this.getError(err);
        return throwError(()=>errorMsg);
      }
      ));
  }
  getBudget():Observable<Budget>  /* Get Budget of current month */
 {
   let d:Date = new Date();
   let yearmon:string ="";
   let mon:string="";
   let year:string=String(d.getFullYear());
   mon=String(d.getMonth()+1)
   mon=d.getMonth()+1<10?'0'+mon:mon;
   yearmon=year+mon;

return  this.http.get<Budget>(this.url+'getBudget/'+yearmon).pipe(delay(100),catchError(
  (err)=>{
    let errorMsg:string = '';
    errorMsg = this.getError(err);
    return throwError(()=>errorMsg);
  }
  ));

}


  getTotalExpensesofCurrentMonth():Observable<Expense[]>   /* Get Total Expense of Current month */
  {
    return  this.http.get<any>(this.url+'getTotalExpensesOfCurrentMonth').pipe(delay(100),catchError(
      (err)=>{
        let errorMsg:string = '';
        errorMsg = this.getError(err);
        return throwError(()=>errorMsg);
      }
      ));
  }


 

  postExpenses(data:any):Observable<any> /* To Enter New Expense */
  {
     return this.http.post(this.url+'addExpense',data).pipe(delay(100),
       catchError((err) =>{ 

        let errorMsg: string = '';
        errorMsg = this.postError(err);
         return throwError(()=> errorMsg);
        }),
     );
  }

  postBudget(data:number):Observable<any>
  {
    return this.http.post(this.url+'setBudget/'+data,{}).pipe(delay(100),
    catchError((err) =>{
      let errorMsg: string = '';
        errorMsg = this.postError(err);
         return throwError(()=> errorMsg);

    }),
    );
  }


  getError(err : Error):string     /* To handle any HTTP GET Error */
  {
    if(err instanceof HttpErrorResponse)
    {
      if(err.status == 404)
      {
        return "No Data Available";
      }
      else if(err.status == 500)
      {
        return "Internal Server Error"
      }
      
    }
    return "Unknown Server Error";
  }




  postError(err :Error):string     /* To handle any HTTP Post Error */
  {
    if(err instanceof HttpErrorResponse)
    {
      if(err.status == 409)
      {
        return "UTR Already Exists";
      }
      else if(err.status == 500)
      {
        return "Internal Server Error";
      }
    }
    return "Unknown Server Error";
  }

  
 }