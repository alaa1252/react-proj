import { createContext, useContext, useReducer, useEffect } from 'react';
import coursesData from '../data/courses.json';

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  courses: JSON.parse(localStorage.getItem('courses') || JSON.stringify(coursesData)),
  notification: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE': {
      const darkMode = !state.darkMode;
      localStorage.setItem('darkMode', darkMode);
      return { ...state, darkMode };
    }
    case 'LOGIN': {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      localStorage.removeItem('user');
      return { ...state, user: null };
    }
    case 'ADD_COURSE': {
      const courses = [action.payload, ...state.courses];
      localStorage.setItem('courses', JSON.stringify(courses));
      return { ...state, courses };
    }
    case 'UPDATE_COURSE': {
      const courses = state.courses.map(c => c.id === action.payload.id ? action.payload : c);
      localStorage.setItem('courses', JSON.stringify(courses));
      return { ...state, courses };
    }
    case 'DELETE_COURSE': {
      const courses = state.courses.filter(c => c.id !== action.payload);
      localStorage.setItem('courses', JSON.stringify(courses));
      return { ...state, courses };
    }
    case 'SET_NOTIFICATION': {
      return { ...state, notification: action.payload };
    }
    case 'CLEAR_NOTIFICATION': {
      return { ...state, notification: null };
    }
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync dark mode with html class
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Auto-dismiss notifications
  useEffect(() => {
    if (state.notification) {
      const t = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 3500);
      return () => clearTimeout(t);
    }
  }, [state.notification]);

  const notify = (message, type = 'success') => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, notify }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
