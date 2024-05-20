import { Component } from '@angular/core';
import { Hero } from './hero';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes: Hero[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.apiService.getData()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
  if (!name) { return; }
  this.apiService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }
}
