import { Situacao } from "./Situacao";
export class Chip {
  id: number;
  operadora: string;
  numero_tel: string;
  em_uso: boolean;
  saldo: number;
  situation_id: Situacao = new Situacao();
}
