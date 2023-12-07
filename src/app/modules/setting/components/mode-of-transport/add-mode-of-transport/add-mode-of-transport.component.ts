import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-mode-of-transport',
  templateUrl: './add-mode-of-transport.component.html',
  styleUrls: ['./add-mode-of-transport.component.css']
})
export class AddModeOfTransportComponent {

  transport: any = FormGroup

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.transport = this.fb.group({
      modeofTransport:'',
      description:''
      
    })
  }

  addMode() {
    console.log(this.transport);

  }
}
