import { Component, Input } from '@angular/core';
import { Hero } from '../../hero';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  hero: Hero | undefined;
  @Input() heroes?: Hero;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // tuong duong useParam() ben react const {id} = useParam('id');
    console.log('Route ID:', id); // Kiểm tra id

    if (isNaN(id)) {
      console.error('Invalid ID');
      return;
    }

    this.apiService.getHeroById(id).subscribe(
      (response: Hero) => {
        this.hero = response;
        console.log('Hero data:', response); // Kiểm tra response
      },
      (error) => {
        console.error('Error fetching data:', error); // Kiểm tra lỗi
      }
    );
  }

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

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.apiService.deleteHero(id).subscribe(
        () => {
          console.log('Hero deleted in component');
          alert('Hero deleted successfully');
          this.location.back();
        },
        (error) => {
          console.error('Error deleting hero', error);
          alert('Failed to delete hero');
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
