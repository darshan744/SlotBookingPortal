import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {  provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       providers: [provideHttpClient(), provideAnimationsAsync()],
     }).compileComponents();
     fixture = TestBed.createComponent(DashboardComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create the component', () => {
     expect(component).toBeTruthy();
   });

   it('should render user details', () => {
     component.user = {
       Name: 'John Doe',
       Dept:"ECE",
       Year:"3",
       RollNo:"123",
       ResumeLink:"https://example.com",
     };
     fixture.detectChanges();
     const compiled = fixture.nativeElement as HTMLElement;
     expect(compiled.querySelector('left')?.textContent).toContain(
       'John Doe'
     );
     expect(compiled.querySelector('left')?.textContent).toContain('ECE');
     expect(compiled.querySelector('left')?.textContent).toContain('3');
     expect(compiled.querySelector('left')?.textContent).toContain('123');
   });

   it('should handle file upload', () => {
     const file = new File(['test'], 'test-file.txt', { type: 'text/plain' });
     const event = { target: { files: [file] } };
     component.fileInput(event as any);
     expect(component.selectedFileName).toBe('test-file.txt');
   });

   it('should change password', () => {
     spyOn(component, 'changePassword');
     component.passwordForm.value.oldPassword = 'old-password'
     component.passwordForm.value.newPassword = 'new-password'
     component.changePassword();
     expect(component.changePassword).toHaveBeenCalled();
   });

   it('should open query dialog', () => {
     spyOn(component, 'raiseQuery');
     component.raiseQuery();
     expect(component.raiseQuery).toHaveBeenCalled();
   });

   it('should display event results in the table', () => {
     component.eventResults.data = [
       { date : "Tuesday", eventType: 'Mock Interview', marks: 0, remarks: 'None' },
       { date : "WednesDay" ,eventType: 'Group Discussion', marks: 0, remarks: 'None' },
     ];
     fixture.detectChanges();
     const compiled = fixture.nativeElement as HTMLElement;
     const rows = compiled.querySelectorAll('table tbody tr');
     expect(rows.length).toBe(2);
     expect(rows[0].textContent).toContain('Mock Interview');
     expect(rows[1].textContent).toContain('Group Discussion');
   });

});
