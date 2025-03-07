import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { NavProps } from "react-day-picker";

type NavButtonProps = {
    direction: "prev" | "next";
    onPrev?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function CustomNav({ onPreviousClick, onNextClick, previousMonth, nextMonth }: NavProps) {
  const isPrevDisabled = previousMonth === undefined;
  const isNextDisabled = nextMonth === undefined;
  return (
    <div className="flex items-center space-x-2">
      <CustomNavButton direction="prev" onPrev={onPreviousClick} disabled={isPrevDisabled} />
      <CustomNavButton direction="next" onNext={onNextClick} disabled={isNextDisabled} />
    </div>
  );
}

export function CustomNavButton({ direction, onPrev, onNext, disabled, ...buttonProps }: NavButtonProps) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (direction === "prev") {
        onPrev?.(event);
      } else if (direction === "next") {
        onNext?.(event);
      }
    };
    return (
      <button {...buttonProps} onClick={handleClick} disabled={disabled}>
        {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
      </button>
    );
  }