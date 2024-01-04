
export interface ProdutoI {
  nomeProduto: string;
  marcaProduto: MarcaProduto;
  precovenda: number;
  imagemPrincipal: string;
  precocusto: number;
  customedio: number;
  codigoEan13: string;
  subgrupo: SubgrupoI;
  tipoproduto: string;
  proutos_skus: ProutosSku[];
}

export interface MarcaProduto {
  id: number;
  nomeMarca: string;
}

export interface SubgrupoI {
  grupo: Grupo;
  id: number;
  nomeSubgrupo: string;
}

export interface Grupo {
  id: number;
  nomeGrupo: string;
}

export interface ProutosSku {
  id: number;
  codigoEan13Sku: string;
  valordeVenda: number;
  mutiplicador: number;
  medida: string;
  qtdeporSku: number;
  caracteristica: string;
}
