import React, {useState, createContext, ReactNode} from 'react';

export type Customer = {
    [x: string]: ReactNode;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    street_address: string;
    city: string;
    state: string;
    zip: number;
    createdAt: string;
    equipment_profile: number;
    farm_name: string;
    notes: string
  };

  export type Ticket = {
    [x: string]: any;
    ticket_id: number;
    customer_id: number;
    issue: string;
    status: string;
    seasonality: string;
    support: string;
    description: string;
    resolved: string;
    equip_profile: string;
    updatedAt: string;
  }

  export type Profile = {
    profile_id: number;
    equipment_type: string;
    make: string;
    model: string;
  }

  export type Post = {
    map(arg0: (post: Post, index: number) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
    post_id: number;
    ticket_id: number;
    text: string;
    author_first: string;
    author_last: string;
    updatedAt: string;
  }

  export type AppContextType = {
    customers: Customer[];
    setCustomers: (customers: Customer[]) => void;
    selectedCustomer: Customer | null;
    setSelectedCustomer: (customer: Customer) => void;
    addCustomer: (customer: Customer) => void;
    editCustomer: (customer: Customer) => void;
    editCustomerNotes: (customer_id: number, notes: string) => void;
    deleteCustomer: (id: number) => void;
    tickets: Ticket[];
    setTickets: (tickets: Ticket[]) => void;
    selectedTicket: Ticket | null;
    setSelectedTicket: (ticket: Ticket) => void;
    profiles: Profile[];
    addProfile: (profile: Profile) => void;
    editProfile: (profile: Profile) => void;
    setProfiles: (profiles: Profile[]) => void;
    posts: Post[];
    setPosts: (posts: Post[]) => void;
  };
  
  //@ts-expect-error
  export const AppContext = createContext<AppContextType>();

  interface AppProviderProps {
    children: ReactNode;
  }
  export const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [customers, setCustomers] = useState<Customer[]>([]);
    
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
    const addCustomer = (customer: Customer) => {
      setCustomers([...customers, customer]);
    };

    const editCustomer = (editedCustomer: Customer) => {
      if (editedCustomer) {
        setCustomers(customers.map((customer) =>
          customer.id === editedCustomer.id ? editedCustomer : customer
        ));
      }
    };
    
    const editCustomerNotes = (customer_id: number, notes: string) => {
      setCustomers(customers.map((customer) =>
        customer.id === customer_id ? { ...customer, notes: notes } : customer
      ));
    };
    

    const [tickets, setTickets] = useState<Ticket[]>([]);
    
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const [profiles, setProfiles] = useState<Profile[]>([]);

    const addProfile = (profile: Profile) => {
      setProfiles([...profiles, profile]);
    };

    const [posts, setPosts] = useState<Post[]>([]);


    const editProfile = (editedProfile: Profile) => {
      setProfiles(profiles.map((profile) =>
        profile.profile_id === editedProfile.profile_id ? editedProfile: profile
      ));
    };
  
    const deleteCustomer = (id: number) => {
      setCustomers(customers.filter(customer => customer.id !== id));
      if (selectedCustomer && selectedCustomer.id === id) {
        setSelectedCustomer(null);
      }
    };
  
    return (
      <AppContext.Provider value={{ customers, setCustomers, selectedCustomer, setSelectedCustomer, addCustomer, editCustomer, editCustomerNotes, deleteCustomer, tickets, setTickets, selectedTicket, setSelectedTicket, profiles, addProfile, editProfile, setProfiles, posts, setPosts }}>
        {children}
      </AppContext.Provider>
    );
  };
  