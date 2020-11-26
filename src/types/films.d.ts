export interface Film {
  id: string;
  name: string;
}

export interface FilmWithTime extends Film {
  created_at: string;
  updated_at: string;
  screen_number: number;
  film_id: number;
  time_slot: string;
}

export interface FilmObjectFormatted extends Film {
  showingTimes: string[];
}
