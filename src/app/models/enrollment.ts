import {BaseModel} from './base_model';
import {Person} from './person';

class Enrollment extends BaseModel{
  student?: Person;
  classroom?: Classroom;
}
