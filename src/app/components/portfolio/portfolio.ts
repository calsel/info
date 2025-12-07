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
  private typingTexts = ['Frontend Dev', 'Full-Stack Dev', 'Web Designer', 'Script Writer', 'Software Engineer'];
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
    // Убираем класс при уничтожении компонента
    this.removeMenuOpenClasses();
  }

  // Вспомогательный метод для удаления классов
  private removeMenuOpenClasses() {
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
  }

  // Вспомогательный метод для добавления классов
  private addMenuOpenClasses() {
    document.body.classList.add('menu-open');
    document.documentElement.classList.add('menu-open');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Блокируем прокрутку страницы при открытом меню
    if (this.isMenuOpen) {
      this.addMenuOpenClasses();
    } else {
      this.removeMenuOpenClasses();
    }

    // Принудительно запускаем обнаружение изменений
    this.cdRef.detectChanges();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.removeMenuOpenClasses();
    this.cdRef.detectChanges();
  }

  // Обновленный метод для навигации
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();

    // Закрыть меню на мобильных
    this.closeMenu();

    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Высота хедера
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
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

    // Закрываем меню если:
    // 1. Кликнули на оверлей ИЛИ
    // 2. Кликнули не по меню и не по кнопке меню, когда меню открыто
    if ((isMenuOverlay && this.isMenuOpen) || (!isMenu && !isMenuButton && this.isMenuOpen)) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Закрываем меню при увеличении ширины экрана
    if (window.innerWidth > 995) {
      this.closeMenu();
    }
  }

  // Дополнительный обработчик для клавиши Escape
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.isMenuOpen) {
        this.closeMenu();
      }
      if (this.showModal) {
        this.showModal = false;
      }
    }
  }

  // Методы для подвала и навигации
  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Метод для навигации по ссылкам в подвале
  navigateTo(event: Event, href: string): void {
    event.preventDefault();

    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      this.scrollToSection(sectionId, event);
    } else {
      // Внешние ссылки открываются в новой вкладке
      window.open(href, '_blank');
    }
  }

  // Метод для отправки email
  sendEmail(event: Event): void {
    event.preventDefault();
    window.location.href = 'mailto:ivandetad@gmail.com';
  }

  // Метод для копирования email в буфер обмена
  copyEmail(event: Event): void {
    event.preventDefault();
    const email = 'ivandetad@gmail.com';

    navigator.clipboard.writeText(email).then(() => {
      // Можно добавить уведомление об успешном копировании
      console.log('Email скопирован в буфер обмена:', email);
      // Здесь можно показать toast-уведомление
    }).catch(err => {
      console.error('Ошибка копирования:', err);
    });
  }
}
