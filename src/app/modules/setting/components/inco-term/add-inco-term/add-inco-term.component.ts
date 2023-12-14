import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncTermService } from '../../../Services/inc-term/inc-term.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inco-term',
  templateUrl: './add-inco-term.component.html',
  styleUrls: ['./add-inco-term.component.css']
})
export class AddIncoTermComponent {

  incoTerm: any = FormGroup;
  isSubmitted: any = false
  constructor(
    private fb: FormBuilder,
    private incTermSer: IncTermService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.data()
  }

  data() {
    this.incoTerm = this.fb.group({
      inc_terms_code: ['', Validators.required],
      description: ['', Validators.required],

    });
    console.warn(this.incoTerm.value)
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.incoTerm);
      if (this.incoTerm.invalid)
      return Swal.fire({
      title: 'warning',
      text: 'All Field Are Required',
      icon: 'warning',
      showCancelButton: true
    })
      const result: any = await this.incTermSer.createIncTerms(this.incoTerm.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Inc Term Processed Successfully ',
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
