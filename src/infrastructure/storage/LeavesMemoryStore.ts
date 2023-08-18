import { randomUUID } from 'crypto';
import { Leave } from '@/domain/entities/leave';
import { Store } from '@/domain/interfaces/store';

export class LeaveMemoryStore implements Store<Leave> {
  constructor(protected leaves: Leave[] = []) {}
  create(leave: Omit<Leave, 'id'>) {
    const newLeave: Leave = {
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
