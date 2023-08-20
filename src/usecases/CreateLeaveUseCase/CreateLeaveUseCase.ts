import {LeaveMemoryStore} from "@/infrastructure/storage/LeavesMemoryStore";
import {Leave} from "@/domain/entities/Leave";
import {LeaveType, LeaveTypeEnum} from "@/domain/entities/LeaveType";
import {InvalidLeaveType} from "@/domain/errors/InvalidLeaveType";
import config from "@/infrastructure/config";
import {LeaveCantBeAllocated} from "@/domain/errors/LeaveCantBeAllocated";

export type CreateLaveUseCaseRequest = {
  startDate: Date;
  endDate: Date;
  leaveType: string;
}

export default class CreateLeaveUseCase {
  constructor(protected leavesRepository: LeaveMemoryStore) {
  }
  handler({startDate, endDate, leaveType}: CreateLaveUseCaseRequest): void {
    // @ts-ignore
    if (!Object.values(LeaveTypeEnum).includes(leaveType)) {
      throw new InvalidLeaveType();
    }

    const leave = Leave.create({
      startDate,
      endDate,
      leaveType: leaveType as LeaveType
    });

    const currentLeaves = this.leavesRepository.findMany();
    const leavePolicy = config.leavePolicy;

    if (!leavePolicy.validateLeaveDuration(currentLeaves, leave)) {
      throw new LeaveCantBeAllocated();
    }

    this.leavesRepository.create(leave);
  }
}
