import { Equipamentos } from './equipamentos';
import { Colaborador } from 'src/app/models/colaborador';


export class EquipamentoColaborador {
     id: number;
     data_comodato: Date;
     data_devolucao: Date;
     observacao: string;
     termo_assinado: boolean;
     colaborador_id: Colaborador = new Colaborador();
     equipament_id: Equipamentos = new Equipamentos();
}