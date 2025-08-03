export interface ActivityLink {
  linkedin?: string;
  Hashnode?: string;
  github?: string;
}

export interface ActivityData {
  id: number;
  description: string;
  links: ActivityLink[];
}
