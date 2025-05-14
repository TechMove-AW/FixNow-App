export interface WorkRequest {
  id: string;
  title: string;
  description: string;
  time: string;
  date?: Date | string;
  endTime?: string;
  technicianName?: string;
  address?: string;
  mapImageUrl?: string;
  dayText?: string;
  finalAmount?: number;
  finalWorkDescription?: string;
  status?: 'pending' | 'accepted' | 'rejected' | 'completed';
}

export interface ConfirmationDeleteDialogData {
  message: string;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export interface PutPriceDialogData {
  // Puedes añadir aquí datos que el diálogo necesite, como el ID del trabajo
}

export interface PutPriceDialogResult {
  finalAmount: number;
  workDescription: string;
}
