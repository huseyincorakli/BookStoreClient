import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _render: Renderer2,
    private httpClientService: HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertify:AlertifyService
  ) { 
    const img= _render.createElement('img');
    img.setAttribute('src','../../../../../assets/del_icon.png');
    img.setAttribute('style','cursor:pointer;');
    img.width=24;
    img.height=24;
    _render.appendChild(element.nativeElement,img)
  }
  @Output() callback:EventEmitter<any>= new EventEmitter();
  @Input() id:string;
  @Input() controller:string;
  @HostListener('click')
  async onclick(){
    this.openDialog(async ()=>{
      this.spinner.show(SpinnerType.Classic)
      const td=HTMLTableCellElement=this.element.nativeElement
      this.httpClientService.delete({
        controller:this.controller
      },this.id).subscribe(data=>{
        $(td.parentElement).animate({
          opacity:0,
          left:'+=50',
          height:'toogle'
        },800,()=>{
          this.callback.emit()
        })
        this.spinner.hide(SpinnerType.Classic)
        this.alertify.message('Silme işlemi başarılı',{
          dismissOthers:true,
          messageType:MessageType.Success,
          position:Position.BottomRight
        })
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.Classic)
        this.alertify.message(errorResponse.message,{
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.BottomRight
        })
      })
      
    })
  }

  openDialog(callback:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:'250px',
      data:DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==DeleteState.Yes)
        callback()
    });
  }
}
