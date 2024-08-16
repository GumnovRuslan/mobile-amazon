import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { ResetPasswordFormComponent } from '../../components/reset-password-form/reset-password-form.component';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [LoginFormComponent,ResetPasswordFormComponent, RegistrationFormComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss'
})
export class OrderPageComponent {

}
