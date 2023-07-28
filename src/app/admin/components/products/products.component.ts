import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
declare var $: any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  panelOpenState = false;
  constructor(spinner: NgxSpinnerService, private alertfiy: AlertifyService, private httpClientService: HttpClientService) {
    super(spinner)

  }

  ngOnInit(): void {
    this.httpClientService.get({controller:'Product'}).subscribe(data=>console.log(data),
    (errorResponse:HttpErrorResponse)=>{
      console.log(errorResponse.message);
      
    });
    //this.showSpinner(SpinnerType.Clock)
    //this.alertfiy.message('deneme',{messageType:MessageType.Success,position:Position.TopRight})
  }
}
