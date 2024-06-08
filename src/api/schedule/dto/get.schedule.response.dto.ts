type DetailType = KindType[];

type KindType = {
  name: string;
  staffId: number;
};

export type ScheduleType = {
  id: Date
  date: Date
  detail: DetailType[]
};
export class GetScheduleResponseDto {
  startDate: Date;
  endDate: Date;
  schedules: ScheduleType[];
}
