import { Pass } from './pass.interface';

export interface ClientDTO {
  meta: { limit: number; offset: number; size: number };
  passes: Pass[];
}
