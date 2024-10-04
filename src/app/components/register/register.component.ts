import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,  CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  get mobileNumbers() {
    return this.registerForm.controls['mobileNumbers'] as FormArray;
  }

  constructor(private fb: FormBuilder, private userService:UserService , private router:Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumbers: this.fb.array([
        this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{11}$')])
      ]),
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  addMobileNumber(): void {
    this.mobileNumbers.push(this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{11}$')]));
  }

  removeMobileNumber(index: number): void {
    this.mobileNumbers.removeAt(index);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.addUser(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => console.error(err)
      });
    } else {
      console.log("Form is invalid.");
    }
  }

}
