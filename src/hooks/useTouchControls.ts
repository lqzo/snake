import { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import { Direction } from '../game/types';

interface UseTouchControlsProps {
  onSwipe: (direction: Direction) => void;
  enable: boolean;
}

export const useTouchControls = (
  elementRef: React.RefObject<HTMLElement>,
  { onSwipe, enable }: UseTouchControlsProps
) => {
  const hammerRef = useRef<HammerManager | null>(null);

  useEffect(() => {
    if (!elementRef.current || !enable) return;

    // Initialize Hammer
    const mc = new Hammer(elementRef.current);
    
    // Configure Swipe recognizer to detect all directions
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    mc.on('swipeup', () => onSwipe('UP'));
    mc.on('swipedown', () => onSwipe('DOWN'));
    mc.on('swipeleft', () => onSwipe('LEFT'));
    mc.on('swiperight', () => onSwipe('RIGHT'));

    hammerRef.current = mc;

    return () => {
      if (hammerRef.current) {
        hammerRef.current.destroy();
        hammerRef.current = null;
      }
    };
  }, [elementRef, enable, onSwipe]);
};
