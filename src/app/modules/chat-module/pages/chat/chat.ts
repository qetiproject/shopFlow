import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RemoveSVG } from 'assets/icons';
import { ChatService } from '../../services/chat.service';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [ReactiveFormsModule, CommonModule, RemoveSVG],
  templateUrl: './chat.html',
})
export class ChatComponent {
  #router = inject(Router);
  #chatService = inject(ChatService);

  messages = this.#chatService.messages();

  messageControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  send() {
    const value = this.messageControl.value.trim();
    if (!value) return;
    this.#chatService.sendMessage(value);
    this.messageControl.reset();
  }

  close() {
    this.#router.navigate([{ outlets: { chat: null } }]);
  }
}
