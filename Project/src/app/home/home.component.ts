import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieForm: FormGroup;

  reqmovies: string[] = [];

  constructor(private dservice: DataService) { }

  ngOnInit() {
    this.movieForm = new FormGroup({
      'movie'   : new FormControl(null, Validators.required),
      'review': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
      
      this.dservice.writeReview(this.movieForm.value.review).subscribe((value: any) => {

        console.log(typeof(value.data[0]));

        console.log(value.data[0]);

        let num = 0;
        if (value.data[0] ==  43) {

        } else {
          num = -1;
        }



        if (value.data[0] ==  43) {

          this.dservice.getmovies().subscribe((data: any) => {
          //   console.log(data);

             const movies = data.obj;
             for (let movie of movies) {
                if (movie.movie == this.movieForm.value.movie) {
                    console.log(movie.genre);
                }
             }
             console.log(this.reqmovies);
         });
        }
      });
  }

  writeReview() {

  }
}
