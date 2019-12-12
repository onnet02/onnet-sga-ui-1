import { Operador } from './operador';
import { Setor } from './setor';
import { User } from './user';
import { TicketStatus } from "./ticketStatus";

export class Ticket{
    id:number;
    resolvido : boolean;
    descricao: string;
    operador_responsavel: Operador = new Operador();
    ticket_status_id: TicketStatus = new TicketStatus();
    user_id: User = new User();
    setor_id: Setor = new Setor();
    assunto: string;
    usuario_criacao: string;
}