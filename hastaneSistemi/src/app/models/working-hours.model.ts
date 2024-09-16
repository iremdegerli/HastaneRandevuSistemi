export interface AdditionalHour {
  startTime: string;
  endTime: string;
}

export interface WorkingHours {
  doctor: { id: number };
  date: string;
  startTime: string;
  endTime: string;
  isOccupied: boolean;
  additionalHours: AdditionalHour[];
}
