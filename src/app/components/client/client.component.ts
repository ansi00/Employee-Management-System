import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ApiResponseModel } from '../../model/interface/role';
import { UpperCasePipe } from '@angular/common';
import { AlertComponent } from '../../reusable Components/alert/alert.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, AlertComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: ApiResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveClient() {
    debugger;
    this.clientService
      .addUpdate(this.clientObj)
      .subscribe((res: ApiResponseModel) => {
        if (res.result) {
          alert('Client created successfully');
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message);
        }
      });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.clientService
        .deleteClientById(id)
        .subscribe((res: ApiResponseModel) => {
          if (res.result) {
            alert('Client deleted successfully');
            this.loadClient();
            this.clientObj = new Client();
          } else {
            alert(res.message);
          }
        });
    }
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }
}
