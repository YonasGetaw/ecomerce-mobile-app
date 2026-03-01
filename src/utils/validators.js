export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  phone: (phone) => {
    const re = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    return re.test(phone);
  },

  password: (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('One lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('One number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('One special character');
    }
    return errors;
  },

  creditCard: (number) => {
    const re = /^[0-9]{16}$/;
    return re.test(number.replace(/\s/g, ''));
  },

  expiryDate: (date) => {
    const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!re.test(date)) return false;
    
    const [month, year] = date.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month));
    const now = new Date();
    return expiry > now;
  },

  cvv: (cvv) => {
    const re = /^[0-9]{3,4}$/;
    return re.test(cvv);
  },

  zipCode: (zip) => {
    const re = /^[0-9]{5}(-[0-9]{4})?$/;
    return re.test(zip);
  },

  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  required: (value) => {
    return value !== undefined && value !== null && value.toString().trim() !== '';
  },

  minLength: (value, min) => {
    return value && value.length >= min;
  },

  maxLength: (value, max) => {
    return value && value.length <= max;
  },

  matches: (value, compare) => {
    return value === compare;
  }
};