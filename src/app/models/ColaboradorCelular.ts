import { MobileEmail } from './mobileEmail';
import { Chip } from './chip';
import { Colaborador } from './colaborador';
import { Celular } from './celular';

export class ColaboradorCelular {
    id: number;
    phones_id:  Celular = new Celular();
    collaborators_id: Colaborador = new Colaborador();
    data_comodato: Date;
    data_devolucao: Date;
    chip_id: Chip = new Chip();
    mobile_email_id: MobileEmail = new MobileEmail();
    termo_assinado : boolean;
    acessorios: string;
}