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

  // Свойства для анимации набора текста
  private typingTexts = ['Fronted Dev', 'Full-Stack Dev', 'Web Designer', 'Script Writer', 'Software Engineer'];
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingTimeout: any;
  private cursorInterval: any;

  displayedText = '';
  showCursor = true;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.startTypingAnimation();

    this.cursorInterval = setInterval(() => {
      this.showCursor = !this.showCursor;
      this.cdRef.detectChanges();
    }, 500);
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }
  }

  startTypingAnimation() {
    this.typeNextCharacter();
  }

  typeNextCharacter() {
    const currentText = this.typingTexts[this.currentTextIndex];
    const fullText = "I'm " + currentText;
    let typingSpeed = 100;

    if (this.isDeleting) {
      // Удаление текста по одному символу
      if (this.currentCharIndex > 4) { // Удаляем только после "I'm " (4 символа)
        this.currentCharIndex--;
        this.displayedText = fullText.substring(0, this.currentCharIndex);
        typingSpeed = 50;
      } else {
        // Достигли "I'm " - переход к следующему тексту
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
        typingSpeed = 500; // Пауза перед началом нового текста
      }
    } else {
      // Набор текста по одному символу
      if (this.currentCharIndex < fullText.length) {
        this.currentCharIndex++;
        this.displayedText = fullText.substring(0, this.currentCharIndex);
        typingSpeed = 100;
      } else {
        // Текст полностью набран - пауза перед удалением
        this.isDeleting = true;
        typingSpeed = 2000; // Пауза перед началом удаления
      }
    }

    // Принудительно запускаем обнаружение изменений
    this.cdRef.detectChanges();

    // Продолжаем анимацию
    this.typingTimeout = setTimeout(() => {
      this.typeNextCharacter();
    }, typingSpeed);
  }

  // Получаем часть текста до "I'm " (всегда "I'm")
  getImText(): string {
    return "I'm ";
  }

  // Получаем часть текста после "I'm " (профессия)
  getProfessionText(): string {
    if (this.displayedText.startsWith("I'm ")) {
      return this.displayedText.substring(4);
    }
    return this.displayedText.startsWith("I'm") ? this.displayedText.substring(3) : this.displayedText;
  }

  // Проверяем, показывать ли "I'm" (когда начали набирать)
  shouldShowIm(): boolean {
    return this.displayedText.length >= 2; // Показываем когда есть хотя бы "I"
  }

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

  // Закрывать меню при клике вне его области
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('nav') && !target.closest('.menu-toggle')) {
      this.isMenuOpen = false;
    }
  }

  // Закрывать меню при изменении размера окна (на десктопе)
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 995) {
      this.isMenuOpen = false;
    }
  }
}
