import { Monster } from "./monster.interface";

export interface Battle {
  winner: Monster;
  tie: boolean;
}
