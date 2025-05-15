import {BaseModel} from './base-model';
import {Person} from './person';

class Enrollment extends BaseModel{
  student?: Person;
  classroom?: Classroom;
}
