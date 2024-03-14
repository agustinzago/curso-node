import { findHeroById } from './services/hero.services'

const hero = findHeroById(2)

console.log(hero?.name ?? 'Hero not found' )