export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
  Welcome: undefined;
  CreateAccount: undefined;
  Login: undefined;
  PasswordInput: { email: string };
  PasswordRecovery: undefined;
  CodeVerification: { method: string };
  SetupNewPassword: undefined;
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
  Categories: undefined;
  Cart: undefined;
  Favorites: undefined;
  ProductDetail: { product: any };
  ProductSearch: { query?: string; category?: string };
  ImageSearch: undefined;
  FlashSaleDetail: { item: any };
  Filter: undefined;
  Payment: { items: any[] };
  OrderSummary: { order: any };
};

export type AuthStackParamList = {
  Welcome: undefined;
  CreateAccount: undefined;
  Login: undefined;
  PasswordInput: { email: string };
  PasswordRecovery: undefined;
  CodeVerification: { method: string };
  SetupNewPassword: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Categories: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductDetail: { product: any };
  ProductSearch: { query?: string; category?: string };
  ImageSearch: undefined;
  FlashSaleDetail: { item: any };
  Filter: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  OrderSummary: { order: any };
  Payment: { items: any[] };
};

export type CartStackParamList = {
  CartMain: undefined;
  Payment: { items: any[] };
  OrderSummary: { order: any };
};