import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MonsterBattleCard } from './MonsterBattleCard.extended';
import { Monster } from '../../models/interfaces/monster.interface';

const mockMonster: Monster = {
  id: '1',
  name: 'Test Monster',
  attack: 50,
  defense: 30,
  hp: 80,
  speed: 60,
  type: 'fire',
  imageUrl: 'https://example.com/monster.png'
};

describe('MonsterBattleCardExtended', () => {
  it('renders the monster card correctly with a monster', () => {
    render(<MonsterBattleCard monster={mockMonster} title="Player" />);
    
    expect(screen.getByText('Test Monster')).toBeInTheDocument();
    expect(screen.getByText('HP: 80')).toBeInTheDocument();
    expect(screen.getByText('Attack: 50')).toBeInTheDocument();
    expect(screen.getByText('Defense: 30')).toBeInTheDocument();
    expect(screen.getByText('Speed: 60')).toBeInTheDocument();
    
    const image = screen.getByAltText('Test Monster');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/monster.png');
  });

  it('renders placeholder card when no monster is provided', () => {
    render(<MonsterBattleCard title="Player" />);
    
    expect(screen.getByText('Player')).toBeInTheDocument();
    expect(screen.queryByText('HP:')).not.toBeInTheDocument();
    expect(screen.queryByText('Attack:')).not.toBeInTheDocument();
  });

  it('renders placeholder card when monster is null', () => {
    render(<MonsterBattleCard monster={null} title="Computer" />);
    
    expect(screen.getByText('Computer')).toBeInTheDocument();
    expect(screen.queryByText('HP:')).not.toBeInTheDocument();
    expect(screen.queryByText('Attack:')).not.toBeInTheDocument();
  });
});
