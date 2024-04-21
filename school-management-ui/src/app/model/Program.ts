
import { Subject } from './Subject';

export interface Program {
  id: number;
  name?: string;
  subjects?: Subject[];
}
