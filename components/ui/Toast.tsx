'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-card shadow-card-hover transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        type === 'success' ? 'bg-white border-l-4 border-primary' : 'bg-white border-l-4 border-danger'
      )}
    >
      {type === 'success' ? (
        <CheckCircle className="text-primary shrink-0" size={20} />
      ) : (
        <AlertCircle className="text-danger shrink-0" size={20} />
      )}
      <p className="text-text-primary font-medium">{message}</p>
      <button onClick={onClose} className="text-text-secondary hover:text-text-primary ml-2">
        <X size={16} />
      </button>
    </div>
  );
}
