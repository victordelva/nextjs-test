import {LeavePolicy} from "@/domain/entities/LeavePolicy";

const leavePolicy = new LeavePolicy({
  companyId: '123',
  name: 'Default holiday policy',
  allowanceInDays: 25,
});

const config = {
  leavePolicy,
};

export default config;
