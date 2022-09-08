import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {

  newMessage: string = '';
  messageList: string[] = [];
  userId!: string;

  obv!: any;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
    ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
   this.obv = this.chatService.getNewPrivateMessage().subscribe((privatemsg: string) => {
      console.log(privatemsg)
      this.messageList.push(privatemsg);
      console.log("mensajes luego de unsuscribe");
    console.log(this.messageList)
    });
    
  }

  sendMessage() {
    if (this.newMessage !== '' && this.newMessage !== null) {
   
      this.chatService.sendPrivateMessage(this.userId, this.newMessage);
      this.newMessage = '';
    }
    
  }

  ngOnDestroy(): void {
    this.obv.unsubscribe();
  }

}
