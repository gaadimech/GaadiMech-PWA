/**
 * Secure logging utility
 * Only logs in development environment and sanitizes sensitive data
 */

interface LogContext {
  [key: string]: any;
}

class SecureLogger {
  private isDev = import.meta.env.DEV;

  private sanitizeData(data: any): any {
    if (typeof data === 'string') {
      // Mask phone numbers, emails, and other sensitive patterns
      return data
        .replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '***-***-****')
        .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '***@***.***')
        .replace(/[a-zA-Z0-9]{20,}/g, '***REDACTED***'); // API keys/tokens
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }
    
    if (data && typeof data === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        // Skip sensitive fields entirely
        if (['password', 'token', 'secret', 'key', 'authorization', 'phone', 'email', 'mobile'].some(sensitive => 
          key.toLowerCase().includes(sensitive))) {
          sanitized[key] = '***REDACTED***';
        } else {
          sanitized[key] = this.sanitizeData(value);
        }
      }
      return sanitized;
    }
    
    return data;
  }

  log(message: string, context?: LogContext) {
    if (this.isDev) {
      const sanitizedContext = context ? this.sanitizeData(context) : undefined;
      console.log(message, sanitizedContext);
    }
  }

  error(message: string, error?: any, context?: LogContext) {
    if (this.isDev) {
      const sanitizedContext = context ? this.sanitizeData(context) : undefined;
      const errorMessage = error instanceof Error ? error.message : error;
      console.error(message, errorMessage, sanitizedContext);
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.isDev) {
      const sanitizedContext = context ? this.sanitizeData(context) : undefined;
      console.warn(message, sanitizedContext);
    }
  }

  info(message: string, context?: LogContext) {
    if (this.isDev) {
      const sanitizedContext = context ? this.sanitizeData(context) : undefined;
      console.info(message, sanitizedContext);
    }
  }
}

export const logger = new SecureLogger(); 