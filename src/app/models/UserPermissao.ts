import { User } from './user';
import { Permissao } from './permissao';

export class UserPermissao {
    id: number;
    permissao_id : Permissao = new Permissao();
    user_id: User = new User();
}