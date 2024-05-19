import { Component, Input } from '@angular/core';
import { Hero } from '../../hero';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {}

  save(): void {
    if (this.hero) {
      this.apiService.updateHero(this.hero).subscribe(
        () => {
          console.log('Hero updated in component');
          alert('Hero updated successfully');
        },
        (error) => {
          console.error('Error updating hero', error);
          alert('Failed to update hero');
        }
      );
    }
  }
}
