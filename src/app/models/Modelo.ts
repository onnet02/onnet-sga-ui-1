import { Marca } from "./Marca";

export class Modelo{
    id: number;
    nome: string;
    marca_id: Marca = new Marca();
    exclusivo_mobile: boolean;
    marca: Marca;
}