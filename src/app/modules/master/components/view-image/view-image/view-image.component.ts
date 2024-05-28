import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent {

  imgPath = 'http://54.151.187.67:4003/'
  constructor(
    public dialogRef: MatDialogRef<ViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ){
    console.log(data)
    this.imgPath = `${this.imgPath}${this.data}`
  }
}
