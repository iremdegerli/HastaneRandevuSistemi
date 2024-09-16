export interface WorkingHours {
  id: number;
  date: string; // Tarih (YYYY-MM-DD formatında)
  startTime: string; // Başlangıç saati (HH:mm formatında)
  endTime: string; // Bitiş saati (HH:mm formatında)
  additionalHours?: AdditionalHours[]; // Ek çalışma saatleri (opsiyonel)
}

// Ek çalışma saatleri için interface
export interface AdditionalHours {
  startTime: string; // Ek saat başlangıcı (HH:mm formatında)
  endTime: string; // Ek saat bitişi (HH:mm formatında)
}
