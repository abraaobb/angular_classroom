import {BaseModel} from './base-model';

export class Person extends BaseModel {
  static Type = {
    TEACHER: 'teacher',
    STUDENT: 'student'
  }

  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  type?: string;
  password?: string;
}
