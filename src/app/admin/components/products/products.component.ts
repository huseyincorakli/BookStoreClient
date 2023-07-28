import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { Create_Product } from 'src/app/contracts/create_product';
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
  @ViewChild(ListComponent) listComponent:ListComponent;
  createdProduct(create_product:Create_Product){
    this.listComponent.getProducts();
  }
  ngOnInit(): void {
  }
}
