import * as fs from 'fs';
import * as path from 'path';
import { HeroEntity } from '../domain/hero.entity';

export class HeroRepository {
  private readonly filePath = path.resolve(process.cwd(), 'bd', 'database.json');

  private readDatabase(): HeroEntity[] {
    if (!fs.existsSync(this.filePath)) {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    const rawArray = JSON.parse(data) as any[];

    // Instancia objetos reais da classe HeroEntity (incluindo imagemUrl opcional)
    return rawArray.map(
      (item) => new HeroEntity(item.id, item.nome, item.poder, item.universo, item.ativo)
    );
  }

  private writeDatabase(heroes: HeroEntity[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(heroes, null, 2), 'utf-8');
  }

  findAll(): HeroEntity[] {
    return this.readDatabase();
  }

  findById(id: number): HeroEntity | undefined {
    const heroes = this.readDatabase();
    return heroes.find((hero) => hero.id === id);
  }

  create(nome: string, poder: string, universo: string, ativo: boolean = true, imagemUrl?: string): HeroEntity {
    const heroes = this.readDatabase();
    // Cálculo do próximo ID simples e direto: pega o último ID e soma 1
    const ultimoHeroi = heroes[heroes.length - 1];
    const nextId = ultimoHeroi ? ultimoHeroi.id + 1 : 1;

    const newHero = new HeroEntity(nextId, nome, poder, universo, ativo);
    heroes.push(newHero);
    this.writeDatabase(heroes);

    return newHero;
  }

  save(hero: HeroEntity): HeroEntity {
    const heroes = this.readDatabase();
    const index = heroes.findIndex((h) => h.id === hero.id);

    if (index === -1) {
      heroes.push(hero);
    } else {
      heroes[index] = hero;
    }

    this.writeDatabase(heroes);
    return hero;
  }

  delete(id: number): boolean {
    const heroes = this.readDatabase();
    const index = heroes.findIndex((hero) => hero.id === id);

    if (index === -1) {
      return false;
    }

    heroes.splice(index, 1);
    this.writeDatabase(heroes);
    return true;
  }
}