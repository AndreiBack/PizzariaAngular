import { Cliente } from "./cliente";
import { Funcionario } from "./funcionario";
import { Pizza } from "./pizza";
import { Produto } from "./produto";
import { Status } from "./status";

export class Pedido {
    id!: number;
    status!: Status;
    valorTotal!: number;
    dataHora!: Date;
    observacao!: string;
    cliente : Cliente = new Cliente;
    funcionario : Funcionario = new Funcionario;
    pizzas!: Pizza[];
    produtos!: Produto[];

    excluirCliente() {
        this.cliente = new Cliente(); 
    }
}

