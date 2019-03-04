import { Injectable } from '@angular/core';
import { Message, MessageType } from './message';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private introMessage = new Message("messages will be printed here...")
  private clearedListMessage = new Message("messages list was purged")

  messages: Message[] = [this.introMessage];
  enabled: boolean = true;

  // add(messageContent: string) {
  //   const message = new Message(messageContent)
  //   this.messages.push(message)
  // }

  info(messageContent: string) {
    if (this.enabled) {
      const message = new Message(messageContent, MessageType.Info);
      this.messages.push(message)
    }
  }

  success(messageContent: string) {
    if (this.enabled) {
      const message = new Message(messageContent, MessageType.Success);
      this.messages.push(message);
    }
  }

  error(messageContent: string) {
    if (this.enabled) {
      const message = new Message(messageContent, MessageType.Error);
      this.messages.push(message);
    }
  }

  clear(): void {
    this.messages = [this.clearedListMessage];
  }

  toggleEnabled(): void {
    this.enabled = !this.enabled;
  }
}
