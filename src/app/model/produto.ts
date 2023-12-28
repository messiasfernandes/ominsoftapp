import { MarcaProduto } from "./marcaproduto"
import { ProdutoSku } from "./produto-sku"
import { Subgrupo } from "./subgrupo"

export class Produto {
  nomeProduto?: string
  marcaProduto?: MarcaProduto
  precovenda?: number
  imagemPrincipal?: string
  precocusto?: number
  customedio?: number
  codigoEan13?: string
  subgrupo?: Subgrupo
  tipoproduto?: string
  proutos_skus : ProdutoSku[]=[]
}

