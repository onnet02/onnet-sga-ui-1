import { Ticket } from './ticket';
import { Operador } from './operador';

export class AtendenteTicket {
    id: number;
    operador_id: Operador = new Operador();
    ticket_id: Ticket = new Ticket();
    imagem: string;
    mensagem: string;
}