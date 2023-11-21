import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  general: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.create()

  }
  create() {
    this.general = this.fb.group({
      matDes: '',
      matGrp: '',
      matType: '',
      indSec: '',
      net: '',
      vol: '',
      sto: '',
      temp: '',
      trans: '',
      pkgWt: '',
      unitDim: '',
      unitWt: '',
      pkgVol: '',
      volUnit: '',
      exWt: '',
      ind: '',
      oldMat: '',
      base: '',
      gross: '',
      wtUnit: '',
      volu: '',
      length: '',
      width: '',
      height: '',
      batch: '',
      tax: '',
      man: '',
      exp: '',
      exVol: '',
      matCost: '',
      plantList: this.fb.array([this.addrow()]),
      salesList:this.fb.array([this.addSales()])
    })

  }


  get detail() {
    return this.general.get('plantList') as FormArray
  }


  addrow() {
    console.log("ajs");

    return this.fb.group({
      stPlant: [''],
      stLoc: [''],
      pro: [''],
      safe: [''],
      repl: [''],
      avai: [''],
      profit: [''],
      bom: [''],

    })
  }

  addPlant() {
    this.detail.push(this.addrow())
  }

  deleterow(index:any){
    this.detail.removeAt(index);
  }



  // sales array

  get salesDetail(){
    return this.general.get('salesList') as FormArray
 
  }

  addSales(){
    console.log("sales array");
    return this.fb.group({
      sales: [''],
      dist: [''],
      deli: [''],
      delPlant: [''],
      maxDel: [''],
      avacheck: [''],
      acct: [''],
      min: [''],
      mindel: [''],
    })
  }
  addSec(){
    this.salesDetail.push(this.addSales())
  }

  deleteSalesrow(index:any){
    this.salesDetail.removeAt(index);
  }
  addAll(){
    console.log(this.general);
    
  }
}
