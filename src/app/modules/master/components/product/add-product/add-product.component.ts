import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  general: any = FormGroup
  isSubmitted:any=false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.create()

  }
  create() {
    this.general = this.fb.group({
      matDes: ['',Validators.required],
      matGrp: ['',Validators.required],
      matType: ['',Validators.required],
      indSec: ['',Validators.required],
      net: ['',Validators.required],
      vol: ['',Validators.required],
      sto: ['',Validators.required],
      temp: ['',Validators.required],
      trans: ['',Validators.required],
      pkgWt: ['',Validators.required],
      unitDim: ['',Validators.required],
      unitWt: ['',Validators.required],
      pkgVol: ['',Validators.required],
      volUnit: ['',Validators.required],
      exWt: ['',Validators.required],
      ind: ['',Validators.required],
      oldMat: ['',Validators.required],
      base: ['',Validators.required],
      gross: ['',Validators.required],
      wtUnit: ['',Validators.required],
      volu: ['',Validators.required],
      length: ['',Validators.required],
      width: ['',Validators.required],
      height: ['',Validators.required],
      batch: ['',Validators.required],
      tax: ['',Validators.required],
      man: ['',Validators.required],
      exp: ['',Validators.required],
      exVol: ['',Validators.required],
      matCost: ['',Validators.required],
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
