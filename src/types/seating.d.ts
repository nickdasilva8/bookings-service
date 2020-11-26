export interface Seat {
  id: number;
  screen_id: number;
  position: string;
  booked: boolean;
  locked: boolean;
  film_id: number;
  time_slot: string;
  updated_at: string;
}
