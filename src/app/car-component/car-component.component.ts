import { Component, OnInit } from '@angular/core';
import { CarService } from '../car-service.service';

@Component({
  selector: 'app-car-box',
  template: `
  <h1 *ngIf="voted === false">Please select your favorite car :</h1>
  <table>
  <tr *ngFor="let car of cars">
    <td (click)="voted === false? voteForCar(car.id): null;">
      <div class="car-block">
        <img [src]="'./images/' + car.picture_url" alt="{{ car.name }}">
      </div>
      <div class="progress">
        <div class="progress-bar" [style.width.%]="car.numberOfVotes === maxVotes ? 100 : (car.numberOfVotes / totalVotes) * 100">{{car.numberOfVotes}}</div>
      </div>
    </td>
  </tr>
</table>
`,
  styles: [`
  table {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  
  td {
    background-color: grey; 
    width: 33.3%; 
    height: 25%; 
    flex-basis: 33.3%;
    text-align: center;
    cursor: pointer;
  }
  
  tr {
    width: 25%;
    margin: 2%;
    padding: 2%;
  }
  
  .progress {
    height: 20px;
  }
  
  .progress-bar {
    background-color: green;
    height: 100%;
  }
  .car-block {
    background-color: grey; 
    height: 120px; 
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
  }    
  `]
})
export class CarComponent implements OnInit {

  cars: any[];
  maxVotes = 0;
  totalVotes = 0;
  voted = false;

  constructor(private carService: CarService) {
    this.cars = [];
   }

  ngOnInit() {
    this.carService.getCarsWithRefresh().subscribe((carsRes: any[]) => {
      this.cars = carsRes;
      this.maxVotes = Math.max(...this.cars.map(c => c.numberOfVotes));
      this.totalVotes = this.cars.reduce((sum, car) => sum + car.numberOfVotes, 0);
    });
  }

  voteForCar(carId: string) {
    this.carService.voteForCar(carId).subscribe((res) => {
      console.log(res);
      this.voted = true;
    });
  }
}
