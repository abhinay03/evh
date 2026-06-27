export interface Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  district: string;
  type: "apartment" | "house";
  residents: number;
  heatingType: "district" | "gas" | "oil" | "electric";
  hasSolar: boolean;
  hasEvCharger: boolean;
  joinedDate: string;
  avatar: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  month: string;
  amount: number;
  paid: boolean;
  dueDate: string;
  type: "heating" | "electricity" | "combined";
}

export interface UsageData {
  month: string;
  heating: number;
  electricity: number;
  temperature: number;
}

export interface Reward {
  id: string;
  customerId: string;
  title: string;
  description: string;
  points: number;
  category: "coffee" | "museum" | "transport" | "restaurant" | "green";
  claimed: boolean;
  expiresAt: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "event" | "volunteer" | "workshop";
  participants: number;
  image: string;
}

export interface Neighbourhood {
  id: string;
  name: string;
  districtHeating: boolean;
  expansionPlanned: boolean;
  expansionYear: string;
  carbonSaved: number;
  homesConnected: number;
  renewablePercentage: number;
  communityProjects: number;
}

export const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "Mariana",
    email: "demo@evh.de",
    password: "demo123",
    address: "Merseburger Str. 42, 06110 Halle",
    district: "Innenstadt",
    type: "apartment",
    residents: 1,
    heatingType: "district",
    hasSolar: false,
    hasEvCharger: false,
    joinedDate: "2023-03-15",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-002",
    name: "Thomas Müller",
    email: "mueller@evh.de",
    password: "demo123",
    address: "Frohe Zukunft 12, 06118 Halle",
    district: "Frohe Zukunft",
    type: "house",
    residents: 4,
    heatingType: "district",
    hasSolar: true,
    hasEvCharger: true,
    joinedDate: "2022-08-01",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-003",
    name: "Horst Schneider",
    email: "schneider@evh.de",
    password: "demo123",
    address: "Am Kirchtor 3, 06108 Halle",
    district: "Altstadt",
    type: "apartment",
    residents: 2,
    heatingType: "gas",
    hasSolar: false,
    hasEvCharger: false,
    joinedDate: "2021-11-20",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-004",
    name: "Lisa Fischer",
    email: "fischer@evh.de",
    password: "demo123",
    address: "Ludwig-Wucherer-Str. 78, 06108 Halle",
    district: "Innenstadt",
    type: "apartment",
    residents: 2,
    heatingType: "district",
    hasSolar: false,
    hasEvCharger: false,
    joinedDate: "2024-01-10",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-005",
    name: "Klaus Weber",
    email: "weber@evh.de",
    password: "demo123",
    address: "Delitzscher Str. 56, 06112 Halle",
    district: "Freiimfelde",
    type: "house",
    residents: 3,
    heatingType: "district",
    hasSolar: true,
    hasEvCharger: false,
    joinedDate: "2023-06-05",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-006",
    name: "Maria Schmidt",
    email: "schmidt@evh.de",
    password: "demo123",
    address: "Heideallee 23, 06120 Halle",
    district: "Heide-Nord",
    type: "house",
    residents: 5,
    heatingType: "oil",
    hasSolar: false,
    hasEvCharger: true,
    joinedDate: "2022-04-18",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-007",
    name: "Felix Hoffmann",
    email: "hoffmann@evh.de",
    password: "demo123",
    address: "Große Märkerstr. 15, 06108 Halle",
    district: "Altstadt",
    type: "apartment",
    residents: 1,
    heatingType: "electric",
    hasSolar: false,
    hasEvCharger: false,
    joinedDate: "2024-02-28",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-008",
    name: "Sabine Wagner",
    email: "wagner@evh.de",
    password: "demo123",
    address: "Herrfurthstr. 8, 06116 Halle",
    district: "Dautzsch",
    type: "house",
    residents: 3,
    heatingType: "gas",
    hasSolar: true,
    hasEvCharger: true,
    joinedDate: "2021-09-12",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-009",
    name: "Daniel Richter",
    email: "richter@evh.de",
    password: "demo123",
    address: "Rennbahnweg 5, 06122 Halle",
    district: "Südstadt",
    type: "apartment",
    residents: 2,
    heatingType: "district",
    hasSolar: false,
    hasEvCharger: false,
    joinedDate: "2023-10-01",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: "CUST-010",
    name: "Petra Klein",
    email: "klein@evh.de",
    password: "demo123",
    address: "Trothaer Str. 34, 06118 Halle",
    district: "Trotha",
    type: "house",
    residents: 4,
    heatingType: "district",
    hasSolar: false,
    hasEvCharger: false,
    joinedDate: "2022-12-03",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
];

export const usageData: UsageData[] = [
  { month: "Jan", heating: 420, electricity: 180, temperature: -1 },
  { month: "Feb", heating: 380, electricity: 165, temperature: 1 },
  { month: "Mar", heating: 320, electricity: 155, temperature: 5 },
  { month: "Apr", heating: 240, electricity: 150, temperature: 10 },
  { month: "May", heating: 150, electricity: 145, temperature: 15 },
  { month: "Jun", heating: 80, electricity: 160, temperature: 19 },
  { month: "Jul", heating: 45, electricity: 200, temperature: 22 },
  { month: "Aug", heating: 40, electricity: 195, temperature: 21 },
  { month: "Sep", heating: 90, electricity: 155, temperature: 17 },
  { month: "Oct", heating: 200, electricity: 150, temperature: 11 },
  { month: "Nov", heating: 310, electricity: 160, temperature: 5 },
  { month: "Dec", heating: 400, electricity: 175, temperature: 1 },
];

export const invoices: Invoice[] = [
  { id: "INV-2024-01", customerId: "CUST-001", month: "January 2024", amount: 89.50, paid: true, dueDate: "2024-02-15", type: "combined" },
  { id: "INV-2024-02", customerId: "CUST-001", month: "February 2024", amount: 94.20, paid: true, dueDate: "2024-03-15", type: "combined" },
  { id: "INV-2024-03", customerId: "CUST-001", month: "March 2024", amount: 78.30, paid: true, dueDate: "2024-04-15", type: "combined" },
  { id: "INV-2024-04", customerId: "CUST-001", month: "April 2024", amount: 65.80, paid: true, dueDate: "2024-05-15", type: "combined" },
  { id: "INV-2024-05", customerId: "CUST-001", month: "May 2024", amount: 52.40, paid: true, dueDate: "2024-06-15", type: "combined" },
  { id: "INV-2024-06", customerId: "CUST-001", month: "June 2024", amount: 48.60, paid: false, dueDate: "2024-07-15", type: "combined" },
  { id: "INV-2024-01-EL", customerId: "CUST-001", month: "January 2024", amount: 45.00, paid: true, dueDate: "2024-02-15", type: "electricity" },
  { id: "INV-2024-02-EL", customerId: "CUST-001", month: "February 2024", amount: 42.00, paid: true, dueDate: "2024-03-15", type: "electricity" },
  { id: "INV-2024-03-EL", customerId: "CUST-001", month: "March 2024", amount: 38.00, paid: true, dueDate: "2024-04-15", type: "electricity" },
  { id: "INV-2024-04-EL", customerId: "CUST-001", month: "April 2024", amount: 36.00, paid: true, dueDate: "2024-05-15", type: "electricity" },
  { id: "INV-2024-05-EL", customerId: "CUST-001", month: "May 2024", amount: 34.00, paid: true, dueDate: "2024-06-15", type: "electricity" },
  { id: "INV-2024-06-EL", customerId: "CUST-001", month: "June 2024", amount: 40.00, paid: false, dueDate: "2024-07-15", type: "electricity" },
];

export const rewards: Reward[] = [
  { id: "REW-001", customerId: "CUST-001", title: "Coffee at Kaffeehaus Halle", description: "Free coffee at any participating café", points: 50, category: "coffee", claimed: false, expiresAt: "2024-12-31" },
  { id: "REW-002", customerId: "CUST-001", title: "Händel Museum Tickets", description: "2-for-1 entry to the Händel Museum", points: 120, category: "museum", claimed: false, expiresAt: "2024-10-31" },
  { id: "REW-003", customerId: "CUST-001", title: "Havelinn Card Top-Up", description: "€10 credit for public transport", points: 80, category: "transport", claimed: false, expiresAt: "2024-11-30" },
  { id: "REW-004", customerId: "CUST-001", title: "Dinner at Mexti", description: "15% off your meal at Mexti Restaurant", points: 200, category: "restaurant", claimed: false, expiresAt: "2024-12-31" },
  { id: "REW-005", customerId: "CUST-001", title: "Tree Planted in Your Name", description: "EVH plants a tree in Halles Stadtpark", points: 30, category: "green", claimed: false, expiresAt: "2025-01-01" },
  { id: "REW-006", customerId: "CUST-001", title: "Saale Cycle Tour Voucher", description: "Free bike rental for a day along the Saale", points: 150, category: "green", claimed: false, expiresAt: "2024-09-30" },
  { id: "REW-007", customerId: "CUST-001", title: "Südpark BBQ Set", description: "EVH picnic package for the Südpark", points: 100, category: "restaurant", claimed: false, expiresAt: "2024-08-31" },
  { id: "REW-008", customerId: "CUST-001", title: "Peissnitzburg Visit", description: "Free entry to the Peissnitzburg leisure park", points: 90, category: "museum", claimed: true, expiresAt: "2024-07-31" },
];

export const communityEvents: CommunityEvent[] = [
  { id: "EVT-001", title: "Halle Clean-Up Day", date: "2024-07-15", location: "Stadtpark Halle", type: "volunteer", participants: 234, image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop" },
  { id: "EVT-002", title: "Energy Workshop: District Heating", date: "2024-07-22", location: "EVH Kundencenter", type: "workshop", participants: 45, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop" },
  { id: "EVT-003", title: "Tree Planting at Heidesee", date: "2024-08-05", location: "Heidesee", type: "volunteer", participants: 89, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop" },
  { id: "EVT-004", title: "Halle Night of Energy", date: "2024-08-20", location: "Marktplatz Halle", type: "event", participants: 1200, image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop" },
  { id: "EVT-005", title: "School Energy Education Day", date: "2024-09-02", location: "Grundschule Frohe Zukunft", type: "workshop", participants: 60, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop" },
  { id: "EVT-006", title: "Saaleufer Clean & Green", date: "2024-09-12", location: "Saaleufer", type: "volunteer", participants: 156, image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop" },
];

export const neighbourhoods: Neighbourhood[] = [
  { id: "N-01", name: "Innenstadt", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 12450, homesConnected: 8400, renewablePercentage: 65, communityProjects: 12 },
  { id: "N-02", name: "Altstadt", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 8900, homesConnected: 5200, renewablePercentage: 58, communityProjects: 8 },
  { id: "N-03", name: "Frohe Zukunft", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 7200, homesConnected: 3800, renewablePercentage: 72, communityProjects: 5 },
  { id: "N-04", name: "Heide-Nord", districtHeating: false, expansionPlanned: true, expansionYear: "2025", carbonSaved: 3400, homesConnected: 1200, renewablePercentage: 45, communityProjects: 3 },
  { id: "N-05", name: "Freiimfelde", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 5600, homesConnected: 2900, renewablePercentage: 61, communityProjects: 6 },
  { id: "N-06", name: "Südstadt", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 9800, homesConnected: 6100, renewablePercentage: 55, communityProjects: 9 },
  { id: "N-07", name: "Dautzsch", districtHeating: false, expansionPlanned: true, expansionYear: "2025", carbonSaved: 2100, homesConnected: 800, renewablePercentage: 38, communityProjects: 2 },
  { id: "N-08", name: "Trotha", districtHeating: true, expansionPlanned: false, expansionYear: "—", carbonSaved: 4800, homesConnected: 2600, renewablePercentage: 59, communityProjects: 4 },
  { id: "N-09", name: "Neustadt", districtHeating: true, expansionPlanned: true, expansionYear: "2024", carbonSaved: 15200, homesConnected: 9500, renewablePercentage: 68, communityProjects: 15 },
  { id: "N-10", name: "Kröllwitz", districtHeating: false, expansionPlanned: true, expansionYear: "2026", carbonSaved: 1800, homesConnected: 600, renewablePercentage: 42, communityProjects: 2 },
];

export interface SustainabilityData {
  co2Saved: number;
  renewableGeneration: number;
  districtHeatingAdoption: number;
  homesConnected: number;
  futureTarget: number;
  treesEquivalent: number;
}

export const sustainabilityData: SustainabilityData = {
  co2Saved: 84700,
  renewableGeneration: 186,
  districtHeatingAdoption: 64,
  homesConnected: 42000,
  futureTarget: 95000,
  treesEquivalent: 125000,
};

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: { day: string; temp: number; condition: string }[];
}

export const weatherData: WeatherData = {
  temperature: 6,
  condition: "Cloudy",
  humidity: 72,
  windSpeed: 14,
  forecast: [
    { day: "Tomorrow", temp: 8, condition: "Partly Cloudy" },
    { day: "Wed", temp: 5, condition: "Rain" },
    { day: "Thu", temp: 4, condition: "Cloudy" },
    { day: "Fri", temp: 7, condition: "Sunny" },
  ],
};

export const aiResponses: Record<string, string> = {
  "explain bill": "Your latest bill (June 2024) totals €48.60 for combined heating and electricity. This is 12% lower than last year — mainly due to milder weather reducing heating demand. The breakdown shows €28.40 for district heating and €20.20 for electricity. All green energy, of course.",
  "district heating": "Yes, you can switch to district heating! Your building on Merseburger Str. is already connected to our network. The switch typically takes 2-4 weeks. Based on your current usage, you could save approximately €180/year compared to gas heating. Would you like me to start the process?",
  "save money": "Based on your current usage patterns, here are my recommendations: 1) Switch to district heating (if available) — save up to €180/year. 2) Install a smart thermostat — save up to €120/year. 3) Shift electricity usage to off-peak hours — save up to €65/year. 4) Check your eligibility for our solar panel program.",
  "heating high": "Looking at your heating data, I notice your consumption is 15% higher than last month. This is likely due to the colder weather — average temperature dropped by 4°C. However, your efficiency score of 82/100 is still above the neighbourhood average of 74. Would you like me to adjust your schedule for better efficiency?",
  "incentives": "Great question! Here are current incentives available to EVH customers: 1) District heating switch — €300 bonus + free connection. 2) Smart thermostat — 50% subsidised (€75). 3) Solar panel installation — up to €2,000 Stadtwerke subsidy + federal KfW grant. 4) EV charger — €500 installation discount. 5) Energy efficiency consultation — free for EVH customers.",
  "solar": "Based on your location (Merseburger Str.) and roof orientation, you have good solar potential! Estimated savings: €340/year. Initial investment: ~€6,500 after subsidies. Payback period: ~7 years. Your building is suitable for a 4.2kW system. Would you like a detailed feasibility report?",
};

export const profileSettings = {
  name: "Mariana",
  email: "demo@evh.de",
  address: "Merseburger Str. 42, 06110 Halle",
  apartment: true,
  residents: 1,
  heatingType: "District Heating",
  joinDate: "March 2023",
  preferences: {
    billingCycle: "monthly",
    autopay: true,
    paperless: true,
    language: "de",
    notifications: {
      bills: true,
      usage: true,
      outages: true,
      promotions: false,
      community: true,
    },
  },
};
