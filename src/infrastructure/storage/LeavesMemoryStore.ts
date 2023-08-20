import { randomUUID } from 'crypto';
import {Leave, LeaveInterface} from '@/domain/entities/Leave';
import { Store } from '@/domain/interfaces/store';

export class LeaveMemoryStore implements Store<LeaveInterface> {
  constructor(protected leaves: LeaveInterface[] = []) {
  }
  create(leave: Omit<LeaveInterface, 'id'>) {
    const newLeave: LeaveInterface = {
      id: randomUUID(),
      ...leave,
    };
    this.leaves.push(newLeave);
    return newLeave;
  }
  findMany() {
    return this.leaves;
  }
}
