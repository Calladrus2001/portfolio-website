import React from "react";
import { type IconType } from "react-icons";
import openUrlInNewTab from "../../utils/openUrlInNewTab";
import { cn } from "../../utils/cn";

interface IconButtonProps {
  url: string;
  Icon: IconType;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ url, Icon, className }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openUrlInNewTab(url);
  };

  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer text-on-surface hover:text-accent-hover",
        className
      )}
      onClick={handleClick}
      tabIndex={0}
      aria-label="Open link"
    >
      <Icon />
    </button>
  );
};

export default IconButton;
