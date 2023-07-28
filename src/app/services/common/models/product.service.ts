import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService, ) { }
  
  //CREATE PRODUCT
  create(product:Create_Product,succesCallBack:()=> void,errorCallBack:(errorMessage:string)=>void){
    this.httpClientService.post({
      controller:'product'
    },product).subscribe(result=>{
      succesCallBack()
    },(errorResponse:HttpErrorResponse)=>{
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message: string = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br/>`;
          });
        });
        errorCallBack(message)
    })
  }

  //READ PRODUCT
  read(){

  }

  //DELETE PRODUCT
  delete(){

  }

  //UPDATE PRODUCT
  update(){

  }
}
