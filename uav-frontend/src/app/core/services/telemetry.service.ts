
import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { Telemetry } from '../../models/telemetry';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService implements OnDestroy {

  private client: Client;

  private telemetrySubject =
    new BehaviorSubject<Telemetry | null>(null);

  telemetry$ = this.telemetrySubject.asObservable();

  constructor() {
    console.log('TELEMETRY SERVICE INICIADO');
    this.client = new Client({
      webSocketFactory: () =>
        new SockJS('http://localhost:8080/ws'),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log('WEBSOCKET CONECTADO');

        this.client.subscribe('/topic/telemetry', (message: IMessage) => {
          console.log('MENSAJE STOMP:', message.body);

          const telemetry: Telemetry = JSON.parse(message.body);
          this.telemetrySubject.next(telemetry);
        });
      },

      onStompError: (frame) => {
        console.error('Error STOMP:', frame.headers['message']);
      },

      onWebSocketError: (error) => {
        console.error('Error WebSocket:', error);
      }
    });

    this.client.activate();
  }

  ngOnDestroy(): void {
    this.client.deactivate();
  }

}
