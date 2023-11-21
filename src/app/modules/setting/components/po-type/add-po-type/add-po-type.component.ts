import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-po-type',
  templateUrl: './add-po-type.component.html',
  styleUrls: ['./add-po-type.component.css']
})
export class AddPoTypeComponent {
  poType: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.poType = this.fb.group({
      poType: '',
      poDes: '',
      item: '',
      intNum: '',
      extNum: '',
      
    })
  }

  addCode() {
    console.log(this.poType);

  }
}
