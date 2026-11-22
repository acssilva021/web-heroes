export class HeroEntity {
  constructor(
    public id: number,
    public nome: string,
    public poder: string,
    public universo: string = 'Independente',
    public ativo: boolean = true,
  ) {
    // Validação mínima essencial: o herói não pode nascer sem nome ou sem poder
    this.validar();
  }

  // Método de validação da instância (PTD item e)
  validar(): void {
    if (!this.nome || !this.poder) {
      throw new Error('O herói precisa ter nome e poder informados.');
    }
  }

  // Métodos de Comportamento de Negócio da própria Entidade
  ativar(): void {
    this.ativo = true;
  }

  desativar(): void {
    this.ativo = false;
  }

  alternarStatus(): void {
    this.ativo = !this.ativo;
  }

  /**
   * Método estático auxiliar (PTD item e):
   * Valida rapidamente se um objeto qualquer possui a estrutura mínima de um herói.
   */
  static isValid(data: any): boolean {
    return Boolean(data && data.nome && data.poder);
  }
}

// Alias de conveniência em português conforme indicado no PTD
export { HeroEntity as HeroiEntity };