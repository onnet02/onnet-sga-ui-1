import { Cargo } from './cargo';
import { Empresa } from './empresa';
import { Email } from './email';
import { Setor } from './setor';
export class Colaborador {
    id: number;
    nome: string;
    setor_id: Setor = new Setor();
    email_id: Email = new Email();
    empresa_id: Empresa = new Empresa();
    contato: string;
    cargo_id: Cargo = new Cargo();
    desligado: boolean;
}