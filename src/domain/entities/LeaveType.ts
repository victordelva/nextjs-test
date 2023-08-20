export enum LeaveTypeEnum{
    LEAVE = 'Leave',
    UNPAID = 'Unpaid Leave',
    SICK = 'Sick Leave',
}

export type LeaveType = LeaveTypeEnum.LEAVE | LeaveTypeEnum.UNPAID | LeaveTypeEnum.SICK;