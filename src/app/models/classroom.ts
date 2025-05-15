import {Person} from './person';
import {BaseModel} from './base-model';

class Classroom extends BaseModel {
  name?: string;
  description?: string;
  teacher?: Person;
}
