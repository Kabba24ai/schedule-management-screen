// Equipment Inventory Types
export interface EquipmentItem {
  id: number;
  category: string;
  equipmentName: string;
  equipmentId: string;
  status: 'damaged' | 'maint-hold' | 'rented' | 'available';
  techManager: string;
  lastUpdated: string;
  location: string;
  customerName?: string;
  orderId?: number;
  deliveryDate?: string;
  returnDate?: string;
  store: 'Charlotte' | 'Bon Aqua';
}

// Schedule Management Types
export interface ScheduleItem {
  id: number;
  productName: string;
  customer: string;
  phone: string;
  deliveryAddress: string;
  store: string;
  isRescheduled: boolean;
  category: string;
  deliveryDate: string;
  deliveryTime: string;
  returnDate: string;
  returnTime: string;
  machineId: string;
  machineName: string;
  deliveryStatus: 'pending' | 'completed';
  returnStatus: 'pending' | 'completed';
  deliveryMode: 'truck' | 'store';
  returnMode: 'truck' | 'store';
  paymentStatus: 'pending' | 'paid';
}

// Common Types
export type StoreLocation = 'Charlotte' | 'Bon Aqua';
export type EquipmentStatus = 'damaged' | 'maint-hold' | 'rented' | 'available';
export type PaymentStatus = 'pending' | 'paid';
export type DeliveryStatus = 'pending' | 'completed';
export type TransportMode = 'truck' | 'store';