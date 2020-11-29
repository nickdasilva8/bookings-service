export interface SeatMinimum {
  id: number;
  position: string;
}
export interface Seat extends SeatMinimum {
  screenId: number;
  booked: boolean;
  locked: boolean;
  filmId: number;
  timeSlot: string;
  updatedAt: string;
}

export interface SeatToUpdate {
  id: number;
  updated_at: Date;
  locked: boolean;
}
