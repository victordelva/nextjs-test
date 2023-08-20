import {LeaveInterface} from "@/domain/entities/Leave";
import {LeaveTypeEnum} from "@/domain/entities/LeaveType";

interface LeavePolicyInterface {
  companyId: string;
  name: string;
  allowanceInDays: number;
}


export class LeavePolicy implements LeavePolicyInterface {
  public readonly companyId: string;
  public readonly name: string;
  public readonly allowanceInDays: number;
  constructor({companyId, name, allowanceInDays}: LeavePolicyInterface) {
    this.companyId = companyId;
    this.name = name;
    this.allowanceInDays = allowanceInDays;
  }

  validateLeaveDuration(currentLeaves: Array<LeaveInterface>, newLeave: LeaveInterface): boolean {
    const currentLeavesDuration = currentLeaves.reduce((acc, leave) =>
      acc + (leave.leaveType == LeaveTypeEnum.LEAVE ? leave.durationDays : 0), 0);
    const newLeavesDuration = currentLeavesDuration + (newLeave.leaveType === LeaveTypeEnum.LEAVE ? newLeave.durationDays : 0);
    return newLeavesDuration <= this.allowanceInDays;
  }
}