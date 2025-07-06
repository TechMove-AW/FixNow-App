export interface WorkerProfile {
  id?: string;
  profileImageUrl?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  age?: number | null;
  dni: string;
  specialty: string;
  experienceYears: number;
  address?: string;
  status: 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED'; // Propiedad obligatoria
  username?: string;
  location?: string;
  memberSince?: string;
  paymentMethods?: { iconName: string, label: string }[];
}
