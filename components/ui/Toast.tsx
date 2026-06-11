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

export default function Toast({ message, type = 'success', onClose, duration = 3500 }: ToastProps) {
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
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-card border shadow-2xl transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        type === 'success'
          ? 'border-[rgba(240,98,146,0.35)] bg-[#2A0A14]'
          : 'border-[rgba(255,64,129,0.35)] bg-[#2A0A14]'
      )}
    >
      {type === 'success'
        ? <CheckCircle className="text-secondary shrink-0" size={20} />
        : <AlertCircle className="text-danger shrink-0" size={20} />}
      <p className="text-white font-medium text-sm">{message}</p>
      <button onClick={onClose} className="text-text-secondary hover:text-white ml-2 transition-colors">
        <X size={15} />
      </button>
    </div>
  );
}
