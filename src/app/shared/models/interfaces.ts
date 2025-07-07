// src/app/shared/models/interfaces.ts

// =================================================================
// ==                  MODELOS DE AUTENTICACIÓN                     ==
// =================================================================
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  role: 'CUSTOMER' | 'WORKER';
}

export interface JwtResponse {
  id: number; // accountId
  token: string;
}

export interface AccountResponse {
  id: number; // accountId
  email: string;
  role: 'CUSTOMER' | 'WORKER';
}


// =================================================================
// ==                      MODELOS DE ALERTAS                       ==
// =================================================================
export interface SenderResource {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface AlertResource {
  id: number;
  userId: number;
  type: string;
  logoUrl?: string;
  message: string;
  read: boolean;
  link?: string;
  sender: SenderResource;
  createdAt: string; // El backend devuelve fechas como string ISO 8601
}

export interface CreateAlertResource {
  userId: number;
  type: string;
  logoUrl?: string;
  message: string;
  read: boolean;
  link?: string;
  senderUserId: number;
  senderFirstName: string;
  senderLastName: string;
  senderProfilePicture?: string;
}


// =================================================================
// ==                MODELOS DE USUARIOS Y TRABAJADORES             ==
// =================================================================
export interface UserResource {
  id: number;
  accountId: number;
  workerId: number | null;
  firstName: string;
  lastName: string;
  description: string | null;
}

export interface CreateUserResource {
  accountId: number;
  firstName: string;
  lastName: string;
  description?: string;
}

export interface WorkerCategoryResource {
  id: number;
  displayName: string;
  slug: string;
}

export interface WorkerServiceResource {
  serviceName: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export interface WorkerResource {
  workerId: number;
  userId: number;
  workerCategoryId: number;
  availability: string;
  hourlyRateAmount: number;
  projectsCompleted: number;
  skills: string[];
  services: WorkerServiceResource[];
  // Propiedades anidadas opcionales que podemos cargar después de la petición inicial
  user?: UserResource;
  category?: WorkerCategoryResource;
}

export interface CreateWorkerResource {
  userId: number;
  workerCategoryId: number;
  availability: string;
  hourlyRateAmount: number;
}


// =================================================================
// ==                     MODELOS DE RESEÑAS                        ==
// =================================================================
export interface ReviewResource {
  id: number;
  workerId: number;
  userId: number;
  rating: number;
  comment: string;
  date: string; // El backend devuelve fechas como string ISO 8601
}


// =================================================================
// ==        MODELOS PARA COMPONENTES (No vienen del backend)       ==
// =================================================================

// Modelo para la agenda del técnico
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

// Modelo para el perfil del trabajador en la sección del técnico (puede ser un poco diferente)
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
  status: 'PENDING_APPROVAL' | 'ACTIVE' | 'REJECTED';
  username?: string;
  location?: string;
  memberSince?: string;
  paymentMethods?: { iconName: string; label: string }[];
}
