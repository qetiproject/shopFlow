import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RemoveSVG } from 'assets/icons';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [ReactiveFormsModule, CommonModule, RemoveSVG],
  templateUrl: './chat.html',
})
export class ChatComponent {
  #router = inject(Router);

  messages = signal<{ text: string; mine: boolean }[]>([]);

  messageControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  send() {
    if (this.messageControl.invalid) return;

    const value = this.messageControl.value.trim();
    if (!value) return;

    this.messages.update((m) => [...m, { text: value, mine: true }]);
    this.messageControl.reset();

    setTimeout(() => {
      this.messages.update((m) => [...m, { text: 'Thanks for your message 👋', mine: false }]);
    }, 600);
  }

  close() {
    this.#router.navigate([{ outlets: { chat: null } }]);
  }
}
