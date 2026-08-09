import type { IconType } from "react-icons";
import openUrlInNewTab from "../../../utils/openUrlInNewTab";

type GridItemProps = {
  IconProp: IconType;
  text: string;
  url: string;
};

function GridItem({ IconProp, text, url }: GridItemProps) {
  return (
    <div
      className="max-w-28 max-h-28 p-4 aspect-square flex flex-col justify-center items-center text-center text-on-surface border rounded-md cursor-pointer hover:border-border-accent hover:text-accent-hover group transition-all duration-300"
      onClick={() => openUrlInNewTab(url)}
      tabIndex={0}
      role="button"
      aria-label={text}
    >
      <IconProp
        size={32}
        className="text-accent transition-transform duration-300 group-hover:-translate-y-1"
      />
      <span className="mt-2 text-sm">{text}</span>
    </div>
  );
}

export default GridItem;
