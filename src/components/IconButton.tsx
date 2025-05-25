import React from "react";
import { type IconType } from "react-icons";
import openUrlInNewTab from "../utils/openUrlInNewTab";

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
      className={`${className} cursor-pointer text-stone-200 hover:text-yellow-200`}
      onClick={handleClick}
      tabIndex={0}
      aria-label="Open link"
    >
      <Icon />
    </button>
  );
};

export default IconButton;
