export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "number" | "textarea" | "select" | "file";
  required: boolean;
  options?: string[]; // for select dropdowns
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  priceRaw: number; // in NGN
  estimatedTime: string;
  fields: FormField[];
  popular?: boolean;
}

export type ServiceCategory =
  | "education"
  | "identity"
  | "nysc"
  | "business"
  | "travel"
  | "property"
  | "employment"
  | "printing"
  | "digital"
  | "gadgets";

export interface Order {
  id: string; // e.g. #WP20273, etc.
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  userName: string;
  userEmail: string;
  userPhone: string;
  status: "pending" | "processing" | "approved" | "completed" | "failed";
  orderDate: string;
  amount: number;
  paymentMethod: "Card" | "Bank Transfer" | "USSD" | "Paystack";
  paymentStatus: "unpaid" | "paid";
  details: Record<string, string>;
  generatedData?: {
    pin?: string;
    serial?: string;
    deliveredFile?: string;
    note?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  location: string;
}

export interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
}
