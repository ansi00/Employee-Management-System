import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ApiResponseModel, IDesignation } from '../../model/interface/role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit {
  designationList: IDesignation[] = [];
  masterService = inject(MasterService);
  isLoader: boolean = true;

  ngOnInit(): void {
    this.masterService.getDesignation().subscribe(
      (res: ApiResponseModel) => {
        this.designationList = res.data;
        this.isLoader = false;
      },
      (error) => {
        alert('API Error');
        this.isLoader = false;
      }
    );
  }
}
