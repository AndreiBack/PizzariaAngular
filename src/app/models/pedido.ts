import { Cliente } from "./cliente";
import { Funcionario } from "./funcionario";
import { Pizza } from "./pizza";
import { Produto } from "./produto";

export class Pedido {
    id!: number;
    status!: boolean;
    quantidade!: number;
    valorTotal!: number;
    dataHora!: Date;
    cliente!: Cliente;
    funcionario!: Funcionario;
    pizzas!: Pizza[];
    produtos!: Produto[]
}
