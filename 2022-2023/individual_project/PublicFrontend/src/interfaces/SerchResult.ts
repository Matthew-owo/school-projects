import CustomEvent from "./CustomEvent";

interface SearchResult {
  boxId: number;
  quantity: number;
  weight: number;
  value: number;
  status: string;
  isCompliance: boolean;
  productionDate: string;
  expirationDate: string;
  supplier: string;
  supermarket: string;
  location: string;
  temperature?: number;
  humidity?: number;
  events: CustomEvent[];
}

export default SearchResult;
