import { Component, ElementRef, EventEmitter, HostListener, inject, Output, ViewChild } from '@angular/core';
import { AppCookieService } from '../../services/utils/cookie/app-cookie.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartTotalItems } from '../../../state/cart/selector/cart.selector';
import { selectProfileState } from '../../../state/auth/selector/profile.selector';
import { Profile } from '../../models/Auth/Profile';
import { ProfileActions } from '../../../state/auth/action/profile.action';

@Component({
  selector: 'app-homepage-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './homepage-header.component.html',
  styleUrl: './homepage-header.component.css'
})
export class HomepageHeaderComponent {
  @Output() showCartDetailPopup = new EventEmitter<void>();

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;

  cookie = inject(AppCookieService);
  router = inject(Router);
  store = inject(Store);

  profile$ = this.store.select(selectProfileState);
  profile: Profile | null = null;

  selectCartTotalItems$ = this.store.select(selectCartTotalItems);

  isOpenPopup = false;

  ngOnInit(): void {

    this.profile$.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
        console.log(profile);
      }
    })
  }

  @HostListener('document:click', ['$event'])
  windowClick(e: Event) {
    if (!this.popup.nativeElement.contains(e.target)) {
      this.isOpenPopup = false;
    }
  }

  togglePopup(e: Event) {
    e.stopPropagation();
    this.isOpenPopup = !this.isOpenPopup;
  }

  logout() {
    this.cookie.remove('token');
    const profile: Profile = {
      username: '',
      email: '',
      role: ''
    }
    this.store.dispatch(ProfileActions.saveProfile({ profile }));
    this.router.navigateByUrl('/login');
  }

  showCartDetail() {
    console.log("asdads");

    this.showCartDetailPopup.emit();
  }
}
