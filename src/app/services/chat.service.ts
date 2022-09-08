import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, Observer, Subject, take } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  // public message$: BehaviorSubject<string> = new BehaviorSubject('');
  // public privateMessage$: BehaviorSubject<string> = new BehaviorSubject('');
  // public roomMessage$: BehaviorSubject<string> = new BehaviorSubject('');
  public usersConnected$: BehaviorSubject<Array<string>> = new BehaviorSubject(new Array<string>);
  public availableRooms$: BehaviorSubject<string[]> = new BehaviorSubject(['']);

 // private newGlobalMessageSubject: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  //public allMessages$ = this.newGlobalMessageSubject.asObservable();


  constructor() {}

  socket = io(environment.socketServer);

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }


  // public getAllGlobalMessages = () => {
  //   this.socket.on('message', (message) =>{
  //     this.newGlobalMessageSubject.next([...this.newGlobalMessageSubject.getValue(), message])
  //     console.log(this.newGlobalMessageSubject.getValue())
  //   });
  //   return this.allMessages$;
  // };

  // public getNewMessage = () => {
  //   this.socket.on('message', (message) =>{
  //    // console.log(message)
  //     this.message$.next(message);
  //   });
    
  //   return this.message$.asObservable();
  // };
  
  public getNewMessage() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('message', (message) => {
          observer.next(message);
      });
  });
  }



  public sendPrivateMessage(userId: string, message: string) {
    const newMsg = {
      socketId: userId,
      msg: message
    }
    this.socket.emit('privatemsg', newMsg);
  }

  // public getNewPrivateMessage = () => {
  //   this.socket.on('privatemsg', (privatemsg) =>{
  //    // console.log(message)
  //     this.privateMessage$.next(privatemsg);
  //   });
    
  //   return this.privateMessage$.asObservable();
  // };

  public getNewPrivateMessage() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('privatemsg', (privatemsg) => {
          observer.next(privatemsg);
      });
  });
  }


  public getUsers = () => {
    this.socket.on('users', (users) =>{
      console.log("List of users");
      console.log(users);
      this.usersConnected$.next(users);
    });
    
    return this.usersConnected$.asObservable();
  };

  //CHAT ROOMs
  public joinRoom(roomName: string) {
    this.socket.emit('joinroom', roomName);
    //TODO receive message that succesfully joined the channel
  }

  public leaveRoom(roomName: string) {
    this.socket.emit('leaveroom', roomName);
    //TODO receive message that succesfully joined the channel
  }

  public sendRoomMessage(roomName: string, messageroom: string) {
    const payLoad = {
      roomName: roomName,
      messageroom: messageroom
    }
    this.socket.emit('messageroom', payLoad);
  }

  // public getNewRoomMessage = () => {
  //   this.socket.on('msgroom', (msgroom) =>{
  //    // console.log(message)
  //     this.roomMessage$.next(msgroom);
  //   });
    
  //   return this.roomMessage$.asObservable();
  // };

  public getAllRooms = () => {
    console.log("service getallrooms")
    this.socket.emit('rooms');
    this.socket.on('rooms', (rooms: string[]) => {
      this.availableRooms$.next(rooms);
    })
    
    return this.availableRooms$.asObservable();
  };

  public createRoom(roomName: string) {
    this.socket.emit('createroom', roomName);
  }

  public getNewRoomMessage = () => {
    return new Observable((observer: Observer<any>) => {
        this.socket.on('msgroom', (msgroom) => {
            observer.next(msgroom);
        });
    });
}

 
}