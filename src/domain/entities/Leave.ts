import {LeaveType} from "@/domain/entities/LeaveType";
import {randomUUID} from "crypto";
import {InvalidLeaveDates} from "@/domain/errors/InvalidLeaveDates";

export interface LeaveInterface {
  id: string;
  // userId: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  leaveType?: LeaveType;
}

export class Leave {
  constructor(
    public readonly id: string,
    // public readonly userId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly durationDays: number,
    public readonly leaveType?: LeaveType,
  ) {
  }

  static fromJson(json: string): Leave {
    const obj = JSON.parse(json);
    return new Leave(
      obj.id,
      // obj.userId,
      obj.startDate,
      obj.endDate,
      obj.durationDays,
      obj.leaveType,
    );
  }

  static create({
    startDate,
    endDate,
    leaveType,
  }: {
    startDate: Date;
    endDate: Date;
    leaveType: LeaveType;
  }): Leave {
    if (!this.validate({startDate, endDate})) {
        throw new InvalidLeaveDates();
    }

    return new Leave(
      randomUUID(),
      // 'userId',
      startDate,
      endDate,
      this.calculateDays(startDate, endDate),
      leaveType,
    );
  }

  private static validate({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return startDate >= today
      && endDate >= startDate;
  }

  private static calculateDays(startDate: Date, endDate: Date): number {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
}