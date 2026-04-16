import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cardNumber: string;
  memberSince: string;
  role?: 'patron' | 'staff';
}

interface Loan {
  id: string;
  bookTitle: string;
  author: string;
  dueDate: string;
  status: 'active' | 'overdue';
}

interface Hold {
  id: string;
  bookTitle: string;
  author: string;
  position: number;
  status: 'waiting' | 'ready';
}

interface AuthContextType {
  user: User | null;
  loans: Loan[];
  holds: Hold[];
  login: (cardNumber: string, pin: string) => Promise<boolean>;
  loginStaff: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, cardNumber: string, pin: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo
const MOCK_USER = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane.smith@email.com',
  cardNumber: '123456789',
  memberSince: '2024-01-15',
  role: 'patron' as const
};

const MOCK_STAFF_USER = {
  id: 'staff-1',
  name: 'John Librarian',
  email: 'john.librarian@library.org',
  cardNumber: 'STAFF-001',
  memberSince: '2020-01-01',
  role: 'staff' as const
};

const MOCK_LOANS: Loan[] = [
  {
    id: '1',
    bookTitle: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    dueDate: '2026-04-05',
    status: 'active'
  },
  {
    id: '2',
    bookTitle: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    dueDate: '2026-04-10',
    status: 'active'
  },
  {
    id: '3',
    bookTitle: '1984',
    author: 'George Orwell',
    dueDate: '2026-03-20',
    status: 'overdue'
  }
];

const MOCK_HOLDS: Hold[] = [
  {
    id: '1',
    bookTitle: 'Project Hail Mary',
    author: 'Andy Weir',
    position: 3,
    status: 'waiting'
  },
  {
    id: '2',
    bookTitle: 'The Midnight Library',
    author: 'Matt Haig',
    position: 1,
    status: 'ready'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [holds, setHolds] = useState<Hold[]>([]);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('library_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setLoans(MOCK_LOANS);
      setHolds(MOCK_HOLDS);
    }
  }, []);

  const login = async (cardNumber: string, pin: string): Promise<boolean> => {
    // Mock authentication - accept any card number with PIN "1234"
    if (pin === '1234') {
      const userData = { ...MOCK_USER, cardNumber };
      setUser(userData);
      setLoans(MOCK_LOANS);
      setHolds(MOCK_HOLDS);
      localStorage.setItem('library_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const loginStaff = async (email: string, password: string): Promise<boolean> => {
    // Mock staff authentication - accept any email with password "staff123"
    if (password === 'staff123') {
      const userData = { ...MOCK_STAFF_USER, email };
      setUser(userData);
      setLoans([]);
      setHolds([]);
      localStorage.setItem('library_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setLoans([]);
    setHolds([]);
    localStorage.removeItem('library_user');
  };

  const register = async (name: string, email: string, cardNumber: string, pin: string): Promise<boolean> => {
    // Mock registration
    const userData = {
      id: Date.now().toString(),
      name,
      email,
      cardNumber,
      memberSince: new Date().toISOString().split('T')[0]
    };
    setUser(userData);
    setLoans([]);
    setHolds([]);
    localStorage.setItem('library_user', JSON.stringify(userData));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loans, holds, login, loginStaff, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
