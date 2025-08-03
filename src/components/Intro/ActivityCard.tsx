import type { ActivityData } from "../../types/ActivityData";
import IconButton from "../IconButton";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiHashnode } from "react-icons/si";

function ActivityCard({ data }: { data: ActivityData }) {
  return (
    <div className="flex flex-col w-full p-2 rounded-sm border-b-2 border-b-yellow-200 shadow-lg text-sm">
      <div>{data.description}</div>
      <div className="flex justify-end mt-2">
        <ul className="flex gap-4 lg:gap-2">
          {data.links.map((link, idx) =>
            Object.entries(link).map(([key, url]) => {
              if (!url) return null;
              let Icon;
              if (key.toLowerCase() === "linkedin") Icon = FaLinkedin;
              else if (key.toLowerCase() === "github") Icon = FaGithub;
              else if (key.toLowerCase() === "hashnode") Icon = SiHashnode;
              else return null;
              return (
                <li key={key + url + idx}>
                  <IconButton url={url} Icon={Icon} />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default ActivityCard;
