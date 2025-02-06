import { Component } from '@angular/core';
import { RolesComponent } from '../roles/roles.component';
import { DesignationComponent } from '../designation/designation.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RolesComponent,DesignationComponent,CommonModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {
currentComponent : string = "roles"

changeTab(val:string){
  if(val === "roles"){
    this.currentComponent = "roles"
  }else{
    this.currentComponent = "designation"
  }
}
}
