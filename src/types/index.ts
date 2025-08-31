// Type definitions for Receipt Scanner App

export interface Receipt {
  id: string;
  merchantName: string;
  date: Date;
  total: number;
  items: ReceiptItem[];
  imageUri?: string;
  ocrText?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
  boundingBoxes?: BoundingBox[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}
