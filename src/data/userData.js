export const userData = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  avatar: 'https://via.placeholder.com/150',
  memberSince: '2024',
  addresses: [
    {
      id: 'addr1',
      type: 'Home',
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      country: 'USA',
      phone: '+1234567890',
      isDefault: true
    },
    {
      id: 'addr2',
      type: 'Work',
      fullName: 'John Doe',
      addressLine1: '456 Business Ave',
      addressLine2: 'Suite 100',
      city: 'New York',
      state: 'NY',
      pincode: '10002',
      country: 'USA',
      phone: '+1234567890',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: 'pm1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
      isDefault: true
    },
    {
      id: 'pm2',
      type: 'Mastercard',
      last4: '8888',
      expiry: '08/25',
      isDefault: false
    }
  ],
  orders: [
    {
      id: 'ORD001',
      date: '2024-01-15',
      total: 129.99,
      status: 'delivered',
      items: [
        { id: '1', name: 'Classic White T-Shirt', price: 29.99, quantity: 2 },
        { id: '2', name: 'Slim Fit Jeans', price: 79.99, quantity: 1 }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-20',
      total: 89.99,
      status: 'shipped',
      items: [
        { id: '5', name: 'Running Shoes', price: 89.99, quantity: 1 }
      ]
    }
  ],
  wishlist: ['1', '3', '5'],
  recentlyViewed: ['2', '4', '1']
};