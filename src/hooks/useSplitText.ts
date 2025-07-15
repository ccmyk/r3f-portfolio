// src/hooks/useSplitText.ts
import { useLayoutEffect, useState } from 'react';
import SplitType, { SplitTypeOptions } from 'split-type';

export function useSplitText(
  ref: React.RefObject<HTMLElement>,
  options?: SplitTypeOptions
) {
  const [instance, setInstance] = useState<SplitType | null>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const splitInstance = new SplitType(ref.current, options);
      setInstance(splitInstance);

      return () => {
        splitInstance.revert();
      };
    }
  }, [ref, options]);

  return instance;
}