import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  showModal = false;
  isMenuOpen = false;

  showComingSoon(event: Event) {
    event.preventDefault();
    this.showModal = true;
    this.isMenuOpen = false;
  }

  closeModal() {
    this.showModal = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenuAndNavigate(event: Event) {
    event.preventDefault();
    this.isMenuOpen = false;

    // Плавная прокрутка к контактам если это ссылка Contact
    const target = event.target as HTMLAnchorElement;
    if (target.getAttribute('href') === '#contacts') {
      const contactsElement = document.getElementById('contacts');
      if (contactsElement) {
        contactsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // 
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav') && !target.closest('.menu-toggle')) {
      this.isMenuOpen = false;
    }
  }

  //
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 995) {
      this.isMenuOpen = false;
    }
  }
}
