import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales','Admin'];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiSerive: ApiService
  ) {
    this.mainForm();
  }
  ngOnInit(){}
  mainForm() {
    this.employeeForm= this.fb.group({
      name:['',[Validators.required]],
      email: ['',[
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ],
    ],
    designation: ['',[Validators.required]],
    phoneNumber: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  updateProfile(e) {
    this.employeeForm.get('deignation').setValue(e,{
      onlySelf: true,
    });
  }

  get myForm() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(!this.employeeForm.valid) {
      return false;
    }
    else {
      return this.apiSerive.createEmployee(this.employeeForm.value).subscribe({
        complete: ()=> {
          console.log('Employee successfully created!'),
          this.ngZone.run(()=> this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
