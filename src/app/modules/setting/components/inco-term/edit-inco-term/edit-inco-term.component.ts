import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncTermService } from '../../../Services/inc-term/inc-term.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-inco-term',
  templateUrl: './edit-inco-term.component.html',
  styleUrls: ['./edit-inco-term.component.css']
})
export class EditIncoTermComponent {

  incoTerm: any = FormGroup
  isSubmitted: any = false
  incTermId: any = ''

  constructor(
    private fb: FormBuilder,
    private incTermSer: IncTermService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.incTermId = this.activeRouter.snapshot.paramMap.get('id')
    this.data()
    this.getSingleDetails()
  }

  data() {
    this.incoTerm = this.fb.group({
      _id: ['', Validators.required],
      inc_terms_code: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

  //get single data

  async getSingleDetails() {
    try {
      const result: any =await this.incTermSer.singleIncTermsDetails(this.incTermId)
      console.log(result.data);
      
      if (result.status === '1') {
        this.incoTerm.patchValue(result.data)
      }
    } catch (error) {
      console.error(error);

    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.incoTerm);
      if (this.incoTerm.invalid)
        return
      const result: any = await this.incTermSer.updatedIncTermsDetails(this.incoTerm.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Inc Term Updated Successfully ',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/inco-term-list/'])
        return
      }
      if (result.status === '0')
        return alert(result.message);


    } catch (error) {
      console.error(error);

    }
  }


}
