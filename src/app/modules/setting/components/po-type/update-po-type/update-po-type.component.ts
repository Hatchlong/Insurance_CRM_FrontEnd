import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoTypeService } from '../../../Services/po-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-po-type',
  templateUrl: './update-po-type.component.html',
  styleUrls: ['./update-po-type.component.css']
})
export class UpdatePoTypeComponent {

  poType: any = FormGroup
  poTypeDetail: any = []
  potypeId: any

  constructor(
    private fb: FormBuilder,
    private potypeSer: PoTypeService,
    private router: Router,
    private activeRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.potypeId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.potypeId);
    this.getSinglepotypeDetail()
    this.getPotype()
    this.code()
  }

  code() {
    this.poType = this.fb.group({
      _id: ['', Validators.required],
      poType: ['', Validators.required],
      poTypeDescription: ['', Validators.required],
      itemNumberInterval: ['', Validators.required],
      internalNumberRangeAssignment: ['', Validators.required],
      externalNumberRangeAssignment: ['', Validators.required],

    });
    console.warn(this.poType.value);

  }

  //get single data on 
  async getSinglepotypeDetail() {
    try {
      const result: any = await this.potypeSer.singlePoType(this.potypeId)
      console.log(result);
      if (result.status === '1') {
        this.poType.patchValue(result.data)
      }
    } catch (error) {
      console.error(error);

    }
  }

  //update  data
  async addCode() {
    try {
      if (this.poType.invalid) {
        Swal.fire({
          title: 'warning',
          text: 'All Field Are Required',
          icon: 'warning',
          showCancelButton: true
        })
      }
      const result: any = await this.potypeSer.updatePoType(this.poType.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Successfully Updated',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/po-type-list']);
        return;
      }
      if (result.status === '0') {
        // return alert(result.message)
        Swal.fire({
          title: 'warning',
          text: 'Updation Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }


    } catch (error) {
      console.error(error);


    }
    console.log(this.poType);

  }

  // read all data

  async getPotype() {
    try {
      const result: any = await this.potypeSer.getAllPoType();
      if (result.status === '1') {
        this.poTypeDetail = result.data
      }
      else {
        // alert('Failed')
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
      console.log(result);

    } catch (error) {
      console.error(error)

    }
  }

}
