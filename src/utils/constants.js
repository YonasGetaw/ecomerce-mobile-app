export const constants = {
  appName: 'Shoppe',
  appVersion: '1.0.0',
  
  api: {
    baseUrl: 'https://api.shoppe.com/v1',
    timeout: 30000,
    retryAttempts: 3
  },
  
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100
  },
  
  storage: {
    keys: {
      auth: '@shoppe:auth',
      user: '@shoppe:user',
      cart: '@shoppe:cart',
      favorites: '@shoppe:favorites',
      searchHistory: '@shoppe:search_history',
      recentlyViewed: '@shoppe:recently_viewed',
      settings: '@shoppe:settings'
    }
  },
  
  validation: {
    passwordMinLength: 8,
    phoneMaxLength: 15,
    nameMaxLength: 50,
    addressMaxLength: 200
  },
  
  orderStatus: {
    pending: 'pending',
    processing: 'processing',
    shipped: 'shipped',
    delivered: 'delivered',
    cancelled: 'cancelled',
    returned: 'returned'
  },
  
  paymentMethods: {
    creditCard: 'credit_card',
    debitCard: 'debit_card',
    paypal: 'paypal',
    applePay: 'apple_pay',
    googlePay: 'google_pay',
    cashOnDelivery: 'cod'
  },
  
  shippingMethods: {
    standard: 'standard',
    express: 'express',
    overnight: 'overnight'
  },
  
  countryCodes: [
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+82', country: 'Korea', flag: '🇰🇷' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' }
  ],
  
  currencies: [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' }
  ],
  
  languages: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷' }
  ],
  
  socialLinks: {
    facebook: 'https://facebook.com/shoppe',
    instagram: 'https://instagram.com/shoppe',
    twitter: 'https://twitter.com/shoppe',
    pinterest: 'https://pinterest.com/shoppe'
  },
  
  support: {
    email: 'support@shoppe.com',
    phone: '+1-800-123-4567',
    hours: 'Mon-Fri 9AM-6PM EST'
  }
};