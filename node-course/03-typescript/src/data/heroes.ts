
interface Hero {
    id: number;
    name: string;
    owner: string;
}

export const heroes: Hero[] = [
    { 
      id: 1,
      name: 'Superman', 
      owner: 'DC Comics' },
    { 
      id: 2, 
      name: 'Spider-Man', 
      owner: 'Marvel Comics' },
    { 
      id: 3, 
      name: 'Wonder Woman', 
      owner: 'DC Comics' 
    }
];