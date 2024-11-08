export interface LoginCustomerResponse {
  loginCustomer: {
    success: boolean;
    customerId: number;
    token: string;
  };
}