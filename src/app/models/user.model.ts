export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    zipcode: number;
    city: string;
  };
  website: string;
  company: {
    name: string;
  };
}
