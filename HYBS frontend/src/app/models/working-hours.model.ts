export interface AdditionalHour {
  startTime: string;
  endTime: string;
}

export interface WorkingHours {
  id: number;
  doctor: { id: number };
  date: string;
  startTime: string;
  endTime: string;
  isOccupied: boolean;
  additionalHours: { startTime: string; endTime: string }[];
}
