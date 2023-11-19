import { Movie } from '../../models/Movie';
import { MovieGenre } from '../../models/MovieGenre';
import { Rating } from '../../models/Rating';
import { BaseInterface } from './BaseInterface';

export interface IRatingRepository extends BaseInterface {

    getRatingOfMovie(movie_id: number): Promise<Rating[]>;
}
