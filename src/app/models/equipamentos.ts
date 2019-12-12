import { Modelo } from './Modelo';

export class Equipamentos {
    id: number;
    nome: string;
    modelo_id: Modelo = new Modelo();
    data_aquisicao: Date = new Date();
    alocado: boolean;
    configuracao: string;
}