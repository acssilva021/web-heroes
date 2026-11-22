import { HeroRepository } from '../repository/hero.repository';
import { HeroEntity } from '../domain/hero.entity';


export interface CreateHeroDTO {
  nome: string;
  poder: string;
  universo?: string;
  ativo?: boolean;
}

export interface UpdateHeroDTO {
  nome: string;
  poder: string;
  universo?: string;
  ativo?: boolean;
}

export interface PatchHeroDTO {
  nome?: string;
  poder?: string;
  universo?: string;
  ativo?: boolean;
}

export class HeroService {
  constructor(private readonly heroRepository: HeroRepository) {}

  // 1. Listagem completa
  getAllHeroes(): HeroEntity[] {
    return this.heroRepository.findAll();
  }

  // 2. Busca por ID com verificação de existência
  getHeroById(id: number): HeroEntity {
    const hero = this.heroRepository.findById(id);
    if (!hero) {
      throw new Error(`Herói com ID ${id} não foi encontrado.`);
    }
    return hero;
  }

  // 3. Cadastro a partir do CreateHeroDTO com validação essencial
  create(data: CreateHeroDTO): HeroEntity {
    // Validação mínima essencial: nome e poder não podem ser vazios
    if (!data.nome || !data.poder) {
      throw new Error('O nome e o poder do herói são obrigatórios.');
    }

    return this.heroRepository.create(
      data.nome,
      data.poder,
      data.universo || 'Independente',
      data.ativo !== undefined ? data.ativo : true,
    );
  }

  // 4. Atualização a partir do UpdateHeroDTO
  update(id: number, dados: UpdateHeroDTO): HeroEntity {
    const hero = this.getHeroById(id);

    if (dados.nome !== undefined) hero.nome = dados.nome;
    if (dados.poder !== undefined) hero.poder = dados.poder;
    if (dados.universo !== undefined) hero.universo = dados.universo;
    if (dados.ativo !== undefined) hero.ativo = dados.ativo;
    
    
    hero.validar();

    return this.heroRepository.save(hero);
  }

  // 5. Alternar status ativo/inativo usando método de negócio da entidade
  toggleHeroStatus(id: number): HeroEntity {
    const hero = this.getHeroById(id);
    hero.alternarStatus();
    return this.heroRepository.save(hero);
  }

  // 6. Exclusão por ID
  delete(id: number): void {
    this.getHeroById(id);
    this.heroRepository.delete(id);
  }
}