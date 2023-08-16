interface CustomEvent {
  eventName: string;
  from?: string;
  to?: string;
  temperature?: number;
  humidity?: number;
  timestamp: number;
}

export default CustomEvent;