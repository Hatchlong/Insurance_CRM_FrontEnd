import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-inco-term',
  templateUrl: './add-inco-term.component.html',
  styleUrls: ['./add-inco-term.component.css']
})
export class AddIncoTermComponent {

  incoTerm: any = FormGroup;
  isSubmitted:any=false
  constructor(private fb: FormBuilder,){}

  ngOnInit(): void { 
    this.data()
  }

  data(){
      this.incoTerm = this.fb.group({
        incoTermId: ['', Validators.required],
        description: ['', Validators.required],
       
      });
      console.warn(this.incoTerm.value)
  }

  submitData(){
    this.isSubmitted=true
  }

}
