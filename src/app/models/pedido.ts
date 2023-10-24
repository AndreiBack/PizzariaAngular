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
    observacao!: string;
    cliente: Cliente= new Cliente();;
    funcionario: Funcionario= new Funcionario();;
    pizzas!: Pizza[];
    produtos!: Produto[];
}
