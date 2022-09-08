import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {


  newMessage: string = '';
  messageList: string[] = [];
  usersList: string[] = [];
  roomName!: string;

  obv!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }
  ngOnDestroy(): void {
    this.chatService.leaveRoom(this.roomName);
    this.obv.unsubscribe();
  }

  ngOnInit(): void {
    this.roomName = this.route.snapshot.paramMap.get('room')!;
    this.obv = this.chatService.getNewRoomMessage()
    //.pipe(takeUntil(this._unsubscribeSignal$.asObservable()))
    .subscribe((msgroom: string) => {
      console.log(msgroom);
      this.messageList.push(msgroom);
    })
  }
  sendMessage() {
    if (this.newMessage !== '' && this.newMessage !== null) {
      this.chatService.sendRoomMessage(this.roomName, this.newMessage);
      this.newMessage = '';
    }
  }

}
