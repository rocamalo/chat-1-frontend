import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Observable, Observer } from 'rxjs';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  {
  newMessage: string = '';
  messageList: string[] = [];
  //usersList: string[] = [];

 obv!: any; //TODO check type

totalUsers$ = this.chatService.getUsers();

//allGlobalMessages$ = this.chatService.getAllGlobalMessages(); //this should be an array


  constructor(
    private chatService: ChatService,
    private router: Router
    ){

  }
  ngOnDestroy(): void {
   this.obv.unsubscribe();
  }

  ngOnInit(){
    
   this.obv = this.chatService.getNewMessage().subscribe((message: string) => {
      console.log(message)
      this.messageList.push(message);
    });
    // this.chatService.getUsers().subscribe((users: Array<string>) => { //TODO CHECK TYPE
    //   this.usersList = users;
    // });
  }

  sendMessage() {
    if (this.newMessage !== '' && this.newMessage !== null) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
    
  }

  goToPrivateChat(userId: string) {
    this.router.navigate(["private-chat", userId]);
  }
}