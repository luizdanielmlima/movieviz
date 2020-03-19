import { Movie } from './movie.model';

export interface Cast {
  biography?: string;
  birthday?: string;
  known_for?: Movie[];
  cast_id?: number;
  character?: string;
  credit_id?: string;
  deathday?: string;
  gender?: any;
  homepage?: string;
  id?: number;
  imdb_id: string;
  name?: string;
  order?: number;
  profile_path?: any;
  popularity?: number;
  place_of_birth?: string;
}
