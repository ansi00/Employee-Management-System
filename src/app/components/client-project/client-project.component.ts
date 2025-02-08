import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../services/client.service';
import {
  ApiResponseModel,
  ClientProject,
  IEmployee,
} from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from '../../reusable Components/alert/alert.component';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(''),
    projectCost: new FormControl(''),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),
  });

  clientService = inject(ClientService);
  employeeList: IEmployee[] = [];
  clientList: Client[] = [];
  projectList = signal(<ClientProject[]>[]);

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllClients();
    this.getAllClientProjects();
  }

  getAllEmployees() {
    this.clientService.getAllEmployee().subscribe((res: ApiResponseModel) => {
      this.employeeList = res.data;
    });
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((res: ApiResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    this.clientService
      .addClientProjectUpdate(formValue)
      .subscribe((res: ApiResponseModel) => {
        if (res.result) {
          alert('Project created successfully');
          this.getAllClientProjects();
        } else {
          alert(res.message);
        }
      });
  }

  getAllClientProjects() {
    this.clientService
      .getAllClientProjects()
      .subscribe((res: ApiResponseModel) => {
        this.projectList.set(res.data);
      });
  }
}
