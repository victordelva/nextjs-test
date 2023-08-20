import GetLeavesUseCase from "@/usecases/GetLeavesUseCase/GetLeavesUseCase";
import {LeaveMemoryStore} from "@/infrastructure/storage/LeavesMemoryStore";
import {NextResponse} from "next/server";
import {Leave} from "@/domain/entities/Leave";
import CreateLeaveUseCase from "@/usecases/CreateLeaveUseCase/CreateLeaveUseCase";
import {LeaveCantBeAllocated} from "@/domain/errors/LeaveCantBeAllocated";
import {InvalidLeaveDates} from "@/domain/errors/InvalidLeaveDates";
import {InvalidLeaveType} from "@/domain/errors/InvalidLeaveType";


const store = new LeaveMemoryStore();

export async function GET() {
  const useCase = new GetLeavesUseCase(store); // TODO: move to a container
  const leaves = await useCase.handler();
  return NextResponse.json(leaves);
}

export async function POST(req: Request) {
  const body = await req.json();
  const useCase = new CreateLeaveUseCase(store); // TODO: move to a container

  try {
    useCase.handler({
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      leaveType: body.leaveType,
    });
  } catch (e: any) {
    if (e instanceof LeaveCantBeAllocated || e instanceof InvalidLeaveDates || e instanceof InvalidLeaveType) {
      return NextResponse.json({status: 'error', message: e.message}, {status: 400});
    } else {
      return NextResponse.json({status: 'error', message: 'Unknown error'}, {status: 500});
    }
  }
  return NextResponse.json({status: 'created'}, {status: 201});
}