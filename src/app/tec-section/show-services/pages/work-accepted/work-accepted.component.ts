import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkRequest } from '../../../model/work-request.model';
import { PutPriceComponent } from '../../components/put-price/put-price.component';
import { PutPriceDialogResult } from '../../../model/work-request.model';
import { TranslateModule } from '@ngx-translate/core';
interface ChatMessage {
  text: string;
  sender: 'worker' | 'client';
  timestamp: Date;
}

@Component({
  selector: 'app-work-accepted',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatExpansionModule, DatePipe, MatDialogModule,TranslateModule
  ],
  templateUrl: './work-accepted.component.html',
  styleUrls: ['./work-accepted.component.css']
})
export class WorkAcceptedComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatMessagesContainer') private chatMessagesContainer!: ElementRef;

  workRequestDetails: WorkRequest | null = null;
  clientName: string = 'Cliente';
  messages: ChatMessage[] = [];
  newMessageText: string = '';
  detailsPanelOpenState: boolean = false;
  defaultMapImage: string = 'assets/images/map-placeholder.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['workRequestData']) {
      this.workRequestDetails = navigation.extras.state['workRequestData'] as WorkRequest;
      this.clientName = this.workRequestDetails.technicianName || 'Cliente';
    }
  }

  ngOnInit(): void {
    if (!this.workRequestDetails) {
      const requestId = this.route.snapshot.paramMap.get('requestId');
      console.warn(`WorkAcceptedComponent: No se recibieron datos. ID: ${requestId}`);
    }

    this.messages.push({
      text: `¡Hola ${this.clientName}! Confirmé tu solicitud: "${this.workRequestDetails?.title || 'el trabajo'}".`,
      sender: 'worker',
      timestamp: new Date()
    });

    setTimeout(() => {
      this.messages.push({
        text: '¡Excelente! Aquí te espero.',
        sender: 'client',
        timestamp: new Date(Date.now() + 2000)
      });
      this.scrollToBottom();
    }, 1000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.chatMessagesContainer) {
        this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }

  sendMessage(): void {
    if (this.newMessageText.trim() === '') return;
    this.messages.push({
      text: this.newMessageText,
      sender: 'worker',
      timestamp: new Date()
    });
    this.newMessageText = '';
    this.scrollToBottom();

    setTimeout(() => {
      this.messages.push({
        text: 'Ok, gracias.',
        sender: 'client',
        timestamp: new Date()
      });
      this.scrollToBottom();
    }, 1500);
  }

  openPutPriceDialog(): void {
    const dialogRef = this.dialog.open(PutPriceComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: PutPriceDialogResult | undefined) => {
      if (result) {
        this.processFinishedWork(result);
      } else {
        console.log('Diálogo de precio cerrado sin datos.');
      }
    });
  }

  processFinishedWork(finishData: PutPriceDialogResult): void {
    console.log(`Trabajo ${this.workRequestDetails?.id} finalizado. Monto: ${finishData.finalAmount}, Desc: "${finishData.workDescription}"`);
    alert(`Trabajo "${this.workRequestDetails?.title}" finalizado.\nMonto: ${finishData.finalAmount}\nDescripción: ${finishData.workDescription}`);

    if(this.workRequestDetails) {
      this.workRequestDetails.finalAmount = finishData.finalAmount;
      this.workRequestDetails.finalWorkDescription = finishData.workDescription;
      this.workRequestDetails.status = 'completed';
    }
    this.router.navigate(['/tec-section/agenda']);
  }

  closePage(): void {
    this.router.navigate(['/tec-section/agenda']);
  }
}
