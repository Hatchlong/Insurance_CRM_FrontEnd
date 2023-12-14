import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeOfTransportService } from '../../../Services/mode-of-transport/mode-of-transport.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-mode-of-transport',
  templateUrl: './add-mode-of-transport.component.html',
  styleUrls: ['./add-mode-of-transport.component.css']
})
export class AddModeOfTransportComponent {

  transport: any = FormGroup
  isSubmitted: any = false
  constructor(
    private fb: FormBuilder,
    private motSer: ModeOfTransportService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.transport = this.fb.group({
      modeOfTransport: ['', Validators.required],
      motDescription: ['', Validators.required]

    })
  }

  async addMode() {
    try {
      this.isSubmitted = true
      console.log(this.transport);
      if (this.transport.invalid)
        return
      const result: any = await this.motSer.createModeOfTransport(this.transport.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Successfully Submitted',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/modeOf-transport-list'])
        return
      }
      if (result.status === '0')
        return alert(result.message);

    }

    catch (error) {
      console.error(error);

    }

  }
}
