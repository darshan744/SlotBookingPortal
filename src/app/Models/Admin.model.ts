export interface IBaseResponse {
  message: string;
  success: boolean;
}

export interface IStudentInfo extends IBaseResponse {
  data: {
    id: string;
    name: string;
    email: string;
    department: string;
    year: string;
    resume: string;
  }[];
}
