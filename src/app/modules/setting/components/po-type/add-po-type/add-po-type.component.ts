import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoTypeService } from '../../../Services/po-type.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-po-type',
  templateUrl: './add-po-type.component.html',
  styleUrls: ['./add-po-type.component.css']
})
export class AddPoTypeComponent {

  poType: any = FormGroup
  poTypeDetail:any=[]
  swal:any
  
  constructor(
    private fb: FormBuilder,
    private potypeSer: PoTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPotype()
    this.code()
  }

  code() {
    this.poType = this.fb.group({
      poType: ['', Validators.required],
      poTypeDescription: ['', Validators.required],
      itemNumberInterval: ['', Validators.required],
      internalNumberRangeAssignment: ['', Validators.required],
      externalNumberRangeAssignment: ['', Validators.required],

    });
    console.warn(this.poType.value);

  }


  //submit data
  async addCode() {
    try {
      if (this.poType.invalid) {
        Swal.fire({
          title:'warning',
          text:'All Field Are Required',
          icon:'warning',
          showCancelButton:true
         })
        
      }
      const result: any = await this.potypeSer.createpoTypeDetail(this.poType.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title:'success',
          text:'Successfully Submitted',
          icon:'success',
          showCancelButton:true
        })
       // alert(result.message)
        this.router.navigate(['/settings/po-type-list']);
        return;
      }
      if(result.status==='0'){
        return alert(result.message)
      }


    } catch (error) {
      console.error(error);


    }
    console.log(this.poType);

  }

  // read all data

  async getPotype(){
    try {
      const result:any=await this.potypeSer.getAllPoType();
      if(result.status==='1'){
          this.poTypeDetail=result.data
      }
      else{
        alert('Failed')
      }
      console.log(result);
      
    } catch (error) {
      console.error(error);
      
    }
  }
}
