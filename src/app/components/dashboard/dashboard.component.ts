import { Hero } from './../../hero';
import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      (response: Hero[]) => {
        this.heroes = response.slice(0, 4);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
