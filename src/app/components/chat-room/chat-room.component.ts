import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  rooms: string[] = [];
  roomSelected: string = '';

  newRoom: string = '';
  constructor(
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chatService.getAllRooms().subscribe( (rooms) => {
      console.log("List of rooms");
      console.log(rooms);
      this.rooms = rooms;
    })
  }

  joinRoom() {
    console.log(this.roomSelected);
    this.chatService.joinRoom(this.roomSelected);
    this.router.navigate(["chat-room", this.roomSelected]);
  }

  createRoom() {
    console.log(this.newRoom);
    this.chatService.createRoom(this.newRoom);
    // this.rooms.push(this.newRoom);
    // this.chatService.availableRooms.next([...this.rooms])
  }

}
