import { MonsterServiceExtended } from './monsters.service.extended';
import { API_URL } from '../../constants/env';
import { Battle } from '../../models/interfaces/battle.interface';

global.fetch = jest.fn();

describe('Monsters Service Extended', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get the winner of the battle of monsters', async () => {
    const mockBattle: Battle = {
      winner: {
        id: '1',
        name: 'Winner Monster',
        attack: 50,
        defense: 30,
        hp: 80,
        speed: 60,
        type: 'fire',
        imageUrl: 'https://example.com/winner.png'
      },
      tie: false
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBattle,
    });

    const battleRequest = { monster1Id: '1', monster2Id: '2' };
    const result = await MonsterServiceExtended.battle(battleRequest);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/battle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(battleRequest),
    });

    expect(result).toEqual(mockBattle);
  });

  it('should handle battle service failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const battleRequest = { monster1Id: '1', monster2Id: '2' };

    await expect(MonsterServiceExtended.battle(battleRequest)).rejects.toThrow(
      'Failed to start battle'
    );
  });

  it('should handle tie battle result', async () => {
    const mockBattle: Battle = {
      winner: null as any,
      tie: true
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockBattle,
    });

    const battleRequest = { monster1Id: '1', monster2Id: '2' };
    const result = await MonsterServiceExtended.battle(battleRequest);

    expect(result.tie).toBe(true);
    expect(result.winner).toBe(null);
  });
});
