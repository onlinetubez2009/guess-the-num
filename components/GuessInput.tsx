import React from 'react';
import { Button } from './ui/Button';
import { Plus, Minus } from 'lucide-react';

interface GameControlsProps {
  leftOperand: number | null;
  operator: '+' | '-' | null;
  rightOperand: number | null;
  onSelectLeft: (val: number) => void;
  onSelectOperator: (val: '+' | '-') => void;
  onSelectRight: (val: number) => void;
  disabled: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  leftOperand,
  operator,
  rightOperand,
  onSelectLeft,
  onSelectOperator,
  onSelectRight,
  disabled
}) => {
  const numbers = [1, 2, 3];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-6 w-full max-w-2xl mx-auto my-8">
      {/* Left Side */}
      <div className="flex flex-col gap-3">
        {numbers.map((num) => (
          <Button
            key={`left-${num}`}
            variant={leftOperand === num ? 'game-btn-selected' : 'game-btn'}
            size="xl"
            onClick={() => onSelectLeft(num)}
            disabled={disabled}
            className="rounded-2xl"
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Operator */}
      <div className="flex flex-col gap-3 mx-2 md:mx-4">
        <Button
            variant={operator === '+' ? 'game-btn-selected' : 'game-btn'}
            size="xl"
            onClick={() => onSelectOperator('+')}
            disabled={disabled}
            className="rounded-full w-14 h-14 md:w-16 md:h-16"
        >
            <Plus className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
        <Button
            variant={operator === '-' ? 'game-btn-selected' : 'game-btn'}
            size="xl"
            onClick={() => onSelectOperator('-')}
            disabled={disabled}
            className="rounded-full w-14 h-14 md:w-16 md:h-16"
        >
            <Minus className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-3">
        {numbers.map((num) => (
          <Button
            key={`right-${num}`}
            variant={rightOperand === num ? 'game-btn-selected' : 'game-btn'}
            size="xl"
            onClick={() => onSelectRight(num)}
            disabled={disabled}
            className="rounded-2xl"
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  );
};