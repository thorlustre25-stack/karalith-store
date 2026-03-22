'use client';

import { cn } from '@/lib/utils';

interface DiamondShapeProps {
  className?: string;
}

// All shapes are top-down face-up views, rendered as elegant thin-line outlines
// Viewbox is standardized to 48x48 for consistent sizing

export function RoundShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      {/* Facet lines */}
      <path d="M24 4 L24 44" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M4 24 L44 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M10 10 L38 38" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M38 10 L10 38" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export function OvalShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="24" cy="24" rx="14" ry="21" stroke="currentColor" strokeWidth="1.5" />
      {/* Facet lines */}
      <path d="M24 3 L24 45" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M10 24 L38 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="24" cy="24" rx="7" ry="11" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export function PearShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M24 3 C24 3 10 18 10 30 C10 38 16 45 24 45 C32 45 38 38 38 30 C38 18 24 3 24 3Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Facet lines */}
      <path d="M24 3 L24 45" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M12 30 L36 30" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export function CushionShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="6" y="6" width="36" height="36" rx="10" stroke="currentColor" strokeWidth="1.5" />
      {/* Facet lines */}
      <path d="M24 6 L24 42" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M6 24 L42 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M12 12 L36 36" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M36 12 L12 36" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <rect x="15" y="15" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export function EmeraldShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Octagonal emerald cut outline */}
      <path
        d="M14 4 L34 4 L44 14 L44 34 L34 44 L14 44 L4 34 L4 14 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Step-cut facet lines */}
      <path d="M18 9 L30 9 L39 18 L39 30 L30 39 L18 39 L9 30 L9 18 Z"
        stroke="currentColor" strokeWidth="0.5" opacity="0.4" strokeLinejoin="round" />
      <path d="M21 15 L27 15 L33 21 L33 27 L27 33 L21 33 L15 27 L15 21 Z"
        stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeLinejoin="round" />
    </svg>
  );
}

export function PrincessShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="1.5" />
      {/* Facet lines */}
      <path d="M6 6 L42 42" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M42 6 L6 42" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M24 6 L24 42" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M6 24 L42 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <rect x="15" y="15" width="18" height="18" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function MarquiseShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M24 2 C30 10 40 18 40 24 C40 30 30 38 24 46 C18 38 8 30 8 24 C8 18 18 10 24 2Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Facet lines */}
      <path d="M24 2 L24 46" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M8 24 L40 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export function RadiantShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Rectangular with cut corners */}
      <path
        d="M12 4 L36 4 L44 12 L44 36 L36 44 L12 44 L4 36 L4 12 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Brilliant-cut facet pattern */}
      <path d="M24 4 L24 44" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M4 24 L44 24" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M12 4 L36 44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M36 4 L12 44" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function HeartShape({ className }: DiamondShapeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M24 44 L6 26 C2 22 2 14 6 10 C10 6 16 6 20 10 L24 14 L28 10 C32 6 38 6 42 10 C46 14 46 22 42 26 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Facet line */}
      <path d="M24 14 L24 44" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// Shape registry for easy lookup
export const DIAMOND_SHAPES = [
  { id: 'round', label: 'Round', Component: RoundShape },
  { id: 'oval', label: 'Oval', Component: OvalShape },
  { id: 'pear', label: 'Pear', Component: PearShape },
  { id: 'cushion', label: 'Cushion', Component: CushionShape },
  { id: 'emerald', label: 'Emerald', Component: EmeraldShape },
  { id: 'princess', label: 'Princess', Component: PrincessShape },
  { id: 'marquise', label: 'Marquise', Component: MarquiseShape },
  { id: 'radiant', label: 'Radiant', Component: RadiantShape },
  { id: 'heart', label: 'Heart', Component: HeartShape },
] as const;

// Metal options with display colors
export const METAL_OPTIONS = [
  { id: 'yellow_gold', label: '18K Yellow Gold', labelEs: 'Oro Amarillo 18K', color: '#D4AF37' },
  { id: 'white_gold', label: '18K White Gold', labelEs: 'Oro Blanco 18K', color: '#E8E8E8' },
  { id: 'rose_gold', label: '18K Rose Gold', labelEs: 'Oro Rosa 18K', color: '#B76E79' },
  { id: 'platinum', label: 'Platinum', labelEs: 'Platino', color: '#C0C0C0' },
] as const;

interface ShapeSelectorProps {
  selectedShape: string;
  onSelect: (shape: string) => void;
}

export function ShapeSelector({ selectedShape, onSelect }: ShapeSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-3 sm:grid-cols-9">
      {DIAMOND_SHAPES.map(({ id, label, Component }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={cn(
            'flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all',
            selectedShape === id
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-transparent hover:border-border text-muted-foreground hover:text-foreground'
          )}
        >
          <Component className="h-8 w-8" />
          <span className="text-[10px] font-medium leading-tight">{label}</span>
        </button>
      ))}
    </div>
  );
}

interface MetalSelectorProps {
  selectedMetal: string;
  onSelect: (metal: string) => void;
  language?: string;
}

export function MetalSelector({ selectedMetal, onSelect, language = 'en' }: MetalSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {METAL_OPTIONS.map(({ id, label, labelEs, color }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={cn(
            'flex items-center gap-2.5 px-4 py-2.5 rounded-md border transition-all text-sm',
            selectedMetal === id
              ? 'border-primary bg-primary/5 font-medium'
              : 'border-border hover:border-primary'
          )}
        >
          <span
            className="h-4 w-4 rounded-full border border-black/10 flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          {language === 'es' ? labelEs : label}
        </button>
      ))}
    </div>
  );
}
