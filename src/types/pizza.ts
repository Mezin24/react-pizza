export interface Pizza {
  id: string;
  price?: number;
  title?: string;
  imageUrl?: string;
  size?: number;
  type?: number;
  amount?: number;
}

export interface PizzaData {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category?: number;
  rating?: number;
}

export interface SortByProps {
  name: string;
  sortProperty: string;
}
