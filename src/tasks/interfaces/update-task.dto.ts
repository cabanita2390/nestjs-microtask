export class UpdateTaskDto {
  readonly title?: string;
  readonly description?: string;
  readonly deadline?: Date;
  readonly status?: string;
  readonly assignedTo?: string;
}