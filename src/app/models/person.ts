import {BaseModel} from './base-model';

export class Person extends BaseModel {
  static Type = {
    TEACHER: 'teacher',
    STUDENT: 'student'
  }

  name?: string;
  email?: string;
  type?: string;
}
