import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/** Smooth-scroll to a section on the home page, navigating there first if needed. */
export function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      if (location.pathname !== '/') {
        navigate('/');
        window.setTimeout(
          () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          140,
        );
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [location.pathname, navigate],
  );
}
