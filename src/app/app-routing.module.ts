import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatComponent } from './components/chat/chat.component';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [

  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'private-chat/:id',
    component: PrivateChatComponent
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
  },
  {
    path: 'chat-room/:room',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
