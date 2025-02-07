export interface IRole {
  roleId: number;
  role: string;
}

export interface ApiResponseModel {
  message: string;
  result: boolean;
  data: any;
}

export interface IDesignation {
  designationId: number;
  designation: string;
}

export interface IEmployee {
  empName: string;
  empId: string;
  empCode: string;
  empEmailId: string;
  empDesignation: string;
  role: string;
}
