import { Component, HostListener, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit, OnDestroy {
  showModal = false;
  isMenuOpen = false;

  private typingTexts = ['Frontend Dev', 'Full-Stack Dev', 'Web Designer', 'Script Writer', 'Software Engineer'];
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingTimeout: any;
  private cursorInterval: any;
  private scrollListener!: any;

  displayedText = '';
  showCursor = true;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.startTypingAnimation();

    this.cursorInterval = setInterval(() => {
      this.showCursor = !this.showCursor;
      this.cdRef.detectChanges();
    }, 500);

    this.scrollListener = this.onWindowScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);

    this.onWindowScroll();
  }

  ngOnDestroy() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (this.cursorInterval) clearInterval(this.cursorInterval);

    if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);

    this.removeMenuOpenClasses();
  }

  private onWindowScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  private removeMenuOpenClasses() {
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
  }

  private addMenuOpenClasses() {
    document.body.classList.add('menu-open');
    document.documentElement.classList.add('menu-open');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.addMenuOpenClasses();
    } else {
      this.removeMenuOpenClasses();
    }

    this.cdRef.detectChanges();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.removeMenuOpenClasses();
    this.cdRef.detectChanges();
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();

    this.closeMenu();

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  startTypingAnimation() {
    this.typeNextCharacter();
  }

  typeNextCharacter() {
    const currentText = this.typingTexts[this.currentTextIndex];
    const fullText = "I'm " + currentText;
    let typingSpeed = 100;

    if (this.isDeleting) {
      if (this.currentCharIndex > 4) {
        this.currentCharIndex--;
        this.displayedText = fullText.substring(0, this.currentCharIndex);
        typingSpeed = 50;
      } else {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
        typingSpeed = 500;
      }
    } else {
      if (this.currentCharIndex < fullText.length) {
        this.currentCharIndex++;
        this.displayedText = fullText.substring(0, this.currentCharIndex);
        typingSpeed = 100;
      } else {
        this.isDeleting = true;
        typingSpeed = 2000;
      }
    }

    this.cdRef.detectChanges();

    this.typingTimeout = setTimeout(() => {
      this.typeNextCharacter();
    }, typingSpeed);
  }

  getImText(): string {
    return "I'm ";
  }

  getProfessionText(): string {
    if (this.displayedText.startsWith("I'm ")) return this.displayedText.substring(4);
    return this.displayedText.startsWith("I'm") ? this.displayedText.substring(3) : this.displayedText;
  }

  shouldShowIm(): boolean {
    return this.displayedText.length >= 2;
  }

  showComingSoon(event: Event) {
    event.preventDefault();
    this.showModal = true;
    this.closeMenu();
  }

  closeModal() {
    this.showModal = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const isMenuOverlay = target.classList.contains('menu-overlay') || target.closest('.menu-overlay');
    const isMenuButton = target.closest('.menu-toggle');
    const isMenu = target.closest('nav');

    if ((isMenuOverlay && this.isMenuOpen) || (!isMenu && !isMenuButton && this.isMenuOpen)) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 995) this.closeMenu();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;

    if (this.isMenuOpen) this.closeMenu();
    if (this.showModal) this.showModal = false;
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateTo(event: Event, href: string): void {
    event.preventDefault();

    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      this.scrollToSection(sectionId, event);
      return;
    }

    window.open(href, '_blank');
  }

  sendEmail(event: Event): void {
    event.preventDefault();
    window.location.href = 'mailto:ivandetad@gmail.com';
  }

  copyEmail(event: Event): void {
    event.preventDefault();
    const email = 'ivandetad@gmail.com';

    navigator.clipboard
      .writeText(email)
      .then(() => {
        console.log('Email скопирован в буфер обмена:', email);
      })
      .catch(err => {
        console.error('Ошибка копирования:', err);
      });
  }
}
