
export class LeaveCantBeAllocated extends Error {
  constructor() {
    super('Leave can\'t be allocated');
  }
}