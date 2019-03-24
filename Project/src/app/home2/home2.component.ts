import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { StateService } from '../services/state.service';
import { Movie } from 'src/models/movie.model';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {


  constructor(private dservice: DataService, private sservice: StateService) { }

  
   reqmovies: String[] = [];

  ngOnInit() {
   this.dservice.getUser('rviswa00@gmail.com').subscribe((res: any) => {
        const tuser = res.obj;

       // console.log(tuser);

        this.dservice.getmovies().subscribe((data: any) => {
         //   console.log(data);

            const movies = data.obj;

            for (let movie of movies) {

                // console.log(movie.genre)

                    if (movie.genre == 'Comedy' && tuser.action > 0) {
                   //     console.log(movie.movie);
                        this.reqmovies.push(movie.movie);
                    }
                    if (movie.genre == 'Horror' && tuser.horror > 0) {
                        console.log(movie.name);
                        this.reqmovies.push(movie.movie);
                    }

                    if (movie.genre == 'Scifi' && tuser.scifi > 0) {
                      //  console.log(movie.name);
                        this.reqmovies.push(movie.movie);
                    }
            }

            console.log(this.reqmovies);
        });
    });



   /* this.dservice.insertMovie('Naanum Rowdythan', 'Comedy').subscribe(res => {
      console.log(res);
    });
    */
}

}
