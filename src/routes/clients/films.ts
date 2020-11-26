import { FilmWithTime, FilmObjectFormatted } from '../../types';

/**
 * This function formats the array of all the films and their showing times.
 * @param individualTimeSlotOfFilms
 */
export const FormatAllFilmsWithShowingTimes = (
  individualTimeSlotOfFilms: FilmWithTime[]
): FilmObjectFormatted[] => {
  const filmsByName: any = {};
  const formattedFilms: FilmObjectFormatted[] = [];

  // generate film names as key in object
  individualTimeSlotOfFilms.forEach((slot) => {
    filmsByName[`${slot.name}`] = {
      name: slot.name,
      id: `${slot.film_id}`,
      showingTimes: []
    };
  });

  // loop through it again add push all times to showingTimes.
  individualTimeSlotOfFilms.forEach((slot) => {
    filmsByName[`${slot.name}`].showingTimes.push(slot.time_slot);
  });

  // push film object into array without film name as key
  Object.keys(filmsByName).forEach((film) => {
    formattedFilms.push(filmsByName[`${film}`]);
  });

  return formattedFilms;
};
