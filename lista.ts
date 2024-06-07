import promptSync from 'prompt-sync'; // Importando prompt-sync para interação com o usuário
import * as fs from 'fs'; // Importando fs para manipulação de arquivos

// Definindo a estrutura de um nó da lista encadeada
class MyNode<T>{
    value: T;
    next: MyNode<T>;
    constructor(v:T){
        this.value = v;
        this.next = {} as MyNode<T>;
    }
}

// Definindo a classe da lista encadeada
class List<T>{
    length: number;
    start: MyNode<T>;
    constructor(){
        this.start = {} as MyNode<T>;
        this.length = 0;
    }

    // Método para inserir um nó no final da lista encadeada
    add(node:MyNode<T>){
        node.next = this.start;
        this.start = node;
        ++ this.length;
    }
    //Não será usado
    remove(v:T):boolean{
        let current_node = this.start;
        let previous_node = {} as MyNode<T>;
        let found = false;
        while( Object.keys(current_node).length!= 0 && !found){ 
            if( current_node.value == v){
                found = true;
                if(Object.keys(previous_node).length!= 0){
                    previous_node.next = current_node.next;                   
                } else {
                    this.start = current_node.next;
                }
                --this.length;
            } else {
                previous_node = current_node;
                current_node = current_node.next;
            }            
        }
        return found;
    }

    // Método para exibir o conteúdo da lista encadeada
    print(): void {
        let current_node = this.start;
        process.stdout.write("[");
        while (current_node !== null && current_node.value !== undefined) {
            process.stdout.write(String(current_node.value) + ", ");
            current_node = current_node.next;
        }
        process.stdout.write("]");
        process.stdout.write("\n")
    }
}

// Função para ler o conteúdo de um arquivo de texto e inseri-lo em um array, dividindo cada linha em palavras
function lerArquivoEInserirEmLista<T>(nomeArquivo: string, lista: List<T>): void {
    const data: string = fs.readFileSync(nomeArquivo, 'utf-8');
    // Dividindo o conteúdo do arquivo em linhas
    const linhas: string[] = data.split('\n');
    // Iterando sobre cada linha e dividindo-a em palavras
    linhas.forEach((linha: string) => {
        const palavrasDaLinha: string[] = linha.trim().split(' '); // Dividindo a linha em palavras
        palavrasDaLinha.forEach((palavra: string) => {
            lista.add(new MyNode(palavra as T)); // Adicionando as palavras à lista encadeada
        });
    });
}

// Função para encontrar a posição e contar as ocorrências de uma palavra em uma lista encadeada
function encontrarPosicaoEContarOcorrencias<T>(palavra: T, lista: List<T>): [number[], number] {
    let posicoes: number[] = [];
    let contador: number = 0;
    let index: number = 1;
    let current_node = lista.start;
    while (current_node !== null && current_node.value !== undefined) {
        if (current_node.value === palavra) {
            posicoes.push(index);
            contador++;
        }
        current_node = current_node.next;
        index++;
    }
    return [posicoes, contador];
}

// Nome do arquivo
const nomeArquivo: string = "dados.txt";

// Criando uma instância da lista encadeada
const listaEncadeada = new List<string>();

// Chamando a função para ler o arquivo e inserir as palavras na lista encadeada
lerArquivoEInserirEmLista(nomeArquivo, listaEncadeada);

// Criando a função de prompt
const prompt = promptSync();

// Pedindo para o usuário digitar uma palavra
const palavraUsuario: string = prompt("Digite uma palavra: ");

// Encontrando a posição e contando as ocorrências da palavra na lista de palavras
const [posicoes, ocorrencias] = encontrarPosicaoEContarOcorrencias(palavraUsuario, listaEncadeada);
// Exibindo o resultado
if (ocorrencias > 0) {
    console.log(`A palavra '${palavraUsuario}' aparece ${ocorrencias} vez(es) na lista.`);

} else {
    console.log(`A palavra '${palavraUsuario}' não existe na lista.`);
}

// Teste
// Exibindo todos os elementos da lista encadeada
console.log("Elementos da lista encadeada:");
listaEncadeada.print();

