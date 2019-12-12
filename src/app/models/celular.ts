import { Modelo } from "./Modelo";
import { Situacao } from "./Situacao";
import { Marca } from "./Marca";

export class Celular {
  id: number;
  imei: number;
  imei02: number;
  serial: string;
  sub_modelo: string;
  versao_so: string;
  cor: string;
  alocado: boolean;
  observacao: string;
  estragado: boolean;
  data_aquisicao: Date;
  motivo_danificado: string;
  situation_id: Situacao = new Situacao();
  modelo_id: Modelo = new Modelo();
  modelo: Modelo
}
