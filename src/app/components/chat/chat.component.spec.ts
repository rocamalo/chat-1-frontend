import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatListModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a message on chat when clicking send message', () => {
    spyOn(component, 'sendMessage');
    
    let input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'hola';
    component.messageList[0] = 'hola';
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click');
    fixture.detectChanges();
   let listItem = fixture.debugElement.query(By.css('li')).nativeElement;

    expect(listItem.textContent).toContain('hola');
  });

  it('should render the total of users connected to the chat', () => {
   
    component.usersList = ['userOne','userTwo'];
    const allH3 = fixture.debugElement.queryAll(By.css('h3'));
    fixture.detectChanges();
    expect(allH3[1].nativeElement.textContent).toContain(component.usersList.length);
  });

  it('should not let click on button "Send Message" if input value is empty ', () => {
   
    let input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();
  });
});
