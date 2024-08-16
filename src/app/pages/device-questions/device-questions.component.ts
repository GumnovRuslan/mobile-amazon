import { Component } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { QuestionsComponent } from '../../components/questions/questions.component';

@Component({
  selector: 'app-device-questions',
  standalone: true,
  imports: [NotificationComponent, QuestionsComponent],
  templateUrl: './device-questions.component.html',
  styleUrl: './device-questions.component.scss'
})

export class DeviceQuestionsComponent {

}
