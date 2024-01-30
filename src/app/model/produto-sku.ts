import { Imagemproduto } from './imagemproduto';
import { Atributo } from "./atributo"
import { Medida } from "./medida"

export class ProdutoSku {
  id: number
  sku: string
  codigoEan13Sku: string
  imagemPrincipal: string
  mutiplicador: number
  desconto: number
  qtdePorSku: number
  medida: Medida

  caracteristica: string
  atributos: Atributo[]=[]
  precodeVenda: number
  valordeVenda: number
  imagens:Imagemproduto[]=[]

}

