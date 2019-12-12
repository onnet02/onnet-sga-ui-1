import { MobileEmail } from './mobileEmail';
import { Chip } from './chip';
import { Colaborador } from './colaborador';
import { Celular } from './celular';
export class CelularColaborador {
    id: number;
    data_comodato: Date;
    data_devolucao: Date;
    termo_assinado: boolean;
    acessorios: string;
    celular_id: Celular = new Celular();
    colaborador_id: Colaborador = new Colaborador();
    chip_id: Chip = new Chip();
    mobile_email_id: MobileEmail = new MobileEmail();
    
}