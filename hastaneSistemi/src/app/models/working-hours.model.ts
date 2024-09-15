export interface WorkingHours {
  day: string;        // Örneğin: 'Pazartesi'
  hour: string;       // Örneğin: '09:00'
  isOccupied: boolean; // Bu saatte randevu olup olmadığını belirtir
}