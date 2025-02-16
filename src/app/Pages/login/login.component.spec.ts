import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent , MatInputModule ,ReactiveFormsModule ,MatIconModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create password field and the toggle button should work' , ()=> {
    //password field
    const passwordField = fixture.nativeElement.querySelector('input[formControlName="password"')
    //checking for creation of field
    expect(passwordField).toBeTruthy();
    //checking whether the starting type is password or not
    expect(passwordField.type).toBe('password')
    //password <-> text toggle button
    const passwordToggle = fixture.nativeElement.querySelector('button[mat-icon-button]')
    //expecting passwordToggle button to be there
    expect(passwordToggle).toBeTruthy();
    //viewing password
    passwordToggle.click();
    //updating template
    fixture.detectChanges();
    //checking whether it has changed to text or not
    expect(passwordField.type).toBe('text');
    //again clicking to change
    passwordToggle.click();
    //checking whether it is password or not
    expect(passwordField.type).toBe('password');

  })

  it('should create formfields correctly',()=> {
    //userName field
    const userNameField = fixture.nativeElement.querySelector('input[formControl="userName"');
    //password field
    const passwordField = fixture.nativeElement.querySelector('input[formControlName="password"')
    //login button
    const loginButton = fixture.nativeElement.querySelector('button.button');
    //checking whether its rendered or not
    expect(userNameField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(loginButton).toBeTruthy();
  })

  it('form should be invalid when empty',()=> {
    component.credentials.controls.userName.setValue('');
    component.credentials.controls.password.setValue('');
    expect(component.credentials.invalid).toBeTruthy();
  });

  it('form should be valid', ()=> {
    component.credentials.controls.password.setValue('070404');
    component.credentials.controls.userName.setValue('CSE001');
    expect(component.credentials.valid).toBeTruthy();
  });
});
