import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../message.service';
import { MessageType} from '../message'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @ViewChild('messageBox') private messageBox: ElementRef;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  scrollToBottom(): void {
    try {
      this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
    } catch (err) {
      console.log("Could not auto-scroll messages component to bottom")
    }
  }

  getClass(messageType: MessageType): string {
    switch (messageType) {
      case MessageType.Info:
        return 'text-white';
      case MessageType.Success:
        return 'text-success';
      case MessageType.Error:
        return 'text-danger';
    }
  }

  clearMessages(): void {
    this.messageService.clear();
  }

  toggleEnabled(): void {
    this.messageService.toggleEnabled();
  }

  enabled(): boolean {
    return this.messageService.enabled;
  }
}
