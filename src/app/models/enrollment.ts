import {BaseModel} from './base-model';
import {Person} from './person';
import {Classroom} from './classroom';

export class Enrollment extends BaseModel {
  student?: Person;
  classroom?: Classroom;
}
