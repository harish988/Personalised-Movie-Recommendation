export class  Movie {
    _id: String;
    movie: string;
    genre: string;

    constructor(id: String, movie: string ,  genre: string ) {
        this._id = id;
        this.movie = movie;
        this.genre = genre;
    }
}
