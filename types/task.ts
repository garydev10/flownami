import { UUID } from "node:crypto";

export type Task = {
  id: UUID;
  name: string;
};
