export const formatters = {
  currency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  date: (date, format = 'medium') => {
    const d = new Date(date);
    const options = {
      short: { month: 'numeric', day: 'numeric', year: '2-digit' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { month: 'long', day: 'numeric', year: 'numeric' },
      full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };
    return d.toLocaleDateString('en-US', options[format]);
  },

  time: (time) => {
    const d = new Date(time);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  datetime: (datetime) => {
    const d = new Date(datetime);
    return `${formatters.date(d)} at ${formatters.time(d)}`;
  },

  phone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
  },

  creditCard: (number) => {
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return number;
  },

  number: (num, decimals = 0) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  },

  percentage: (value) => {
    return `${value}%`;
  },

  fileSize: (bytes) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  },

  truncate: (text, length = 100) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  slugify: (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
};