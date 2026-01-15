export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    return 'Email is required'
  }
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  
  // Check for disposable email domains
  const disposableDomains = ['10minutemail.com', 'tempmail.com', 'guerrillamail.com']
  const domain = email.split('@')[1]
  if (disposableDomains.includes(domain)) {
    return 'Disposable email addresses are not allowed'
  }
  
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required'
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number'
  }
  
  if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?])/.test(password)) {
    return 'Password must contain at least one special character'
  }
  
  return null
}

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password'
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  
  return null
}

export const validateFullName = (name: string): string | null => {
  if (!name) {
    return 'Full name is required'
  }
  
  if (name.length < 2) {
    return 'Full name must be at least 2 characters long'
  }
  
  return null
}