type DetailType = KindType[];

type KindType = {
  name: string;
  staffId: number;
};

export class GetScheduleTodayResponseDto {
  detail: DetailType[];
  listMaxStaff: number[];
  id: number[];
}
