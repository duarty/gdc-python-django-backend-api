import { API_URL } from '../../constants/env';
import { Battle } from '../../models/interfaces/battle.interface';

const battle = async (battleRequest: { monster1Id: string; monster2Id: string }): Promise<Battle> => {
  const response = await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(battleRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to start battle');
  }

  return response.json();
};

export const MonsterServiceExtended = {
  battle,
};
