import {LeaveMemoryStore} from "@/infrastructure/storage/LeavesMemoryStore";
import {LeaveInterface} from "@/domain/entities/Leave";

export default class GetLeavesUseCase {
  constructor(protected leavesRepository: LeaveMemoryStore) {
  }
  handler(): Array<LeaveInterface> { // TODO return GetLeavesUseCaseResponse instead of domain object
    return this.leavesRepository.findMany();
  }
}
