
import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

import { Telemetry } from '../../models/telemetry';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService implements OnDestroy {

  private client?: Client;

  private telemetrySubject =
    new BehaviorSubject<Telemetry | null>(null);

  telemetry$ = this.telemetrySubject.asObservable();

  constructor() {

    // En DEMO no se establece ninguna conexión ni se genera telemetría.
    if (environment.mode === 'DEMO') {
      console.log('MODO DEMO: telemetría real no disponible');
      return;
    }

    this.client = new Client({
      webSocketFactory: () =>
        new SockJS(environment.websocketUrl),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log('WEBSOCKET CONECTADO');

        this.client?.subscribe('/topic/telemetry', (message: IMessage) => {
          try {
            const telemetry: Telemetry = JSON.parse(message.body);
            this.telemetrySubject.next(telemetry);
          } catch (error) {
            console.error('Error al interpretar la telemetría:', error);
          }
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
    this.client?.deactivate();
  }
}
