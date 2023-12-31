import type { Country } from  "../Country"

export type Person = {
  id?: string | number;
  email?: string; 
  type?: boolean | ""; 
  identification_card?: string; 
  business_name?: string; 
  phone?: string; 
  country_id?: string | number;
  domicile?: string; 
  country?: Country;
  _method?: 'PUT';
}

export type PersonTG = {
  rows: Rows;
  sort: null | string;
  direction: null | string;
  search: null | string;
}

export type Rows = {
  current_page: number;
  data: PersonRow[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}

export type PersonRow = {
  email?: string; 
  type?: boolean; 
  identification_card?: string; 
  business_name?: string; 
  phone?: string; 
  country_id?: number;
  domicile?: string; 
}

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
}

