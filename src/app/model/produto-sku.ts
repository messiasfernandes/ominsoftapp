import { Atributo } from "./atributo"

export class ProdutoSku {
  id: number
  sku: string
  codigoEan13Sku: string
  imagemPrincipal: string
  mutiplicador: number
  desconto: number
  medida: string
  caracteristica: string
  atributos: Atributo[]=[]
  precodeVenda: number
  valordeVenda: number
  qtdeporSku: number

}

