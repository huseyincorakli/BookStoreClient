import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { List_Product } from 'src/app/contracts/list_products';
import { ProductService } from 'src/app/services/common/models/product.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private productService:ProductService, private alertify: AlertifyService){
    super(spinner)

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'updatedDate','delete'];
  dataSource:MatTableDataSource<List_Product> = null;
   
  async getProducts() {
    this.showSpinner(SpinnerType.Clock)
    const allProducts: { totalCount: number, products: List_Product[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.Clock),
        errorMessage => {
          this.alertify.message(errorMessage,
            { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
        })
        
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)
    this.paginator.length = allProducts.totalCount
  }
  async pageChange(){
    await this.getProducts()
  }

  async ngOnInit() {
    await this.getProducts()
  }
}
