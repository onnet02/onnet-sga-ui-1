import { User } from './user';
import { Setor } from "./setor";

export class Operador {
    id: number;
    setor_id : Setor = new Setor();
    usuario: User = new User();
}