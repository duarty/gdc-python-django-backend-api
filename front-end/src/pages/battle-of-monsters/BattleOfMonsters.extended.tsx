import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard.extended';
import { MonstersList } from '../../components/monsters-list/MonstersList.extended';
import { Title } from '../../components/title/Title';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import { 
  setRandomMonster, 
  fetchBattleWins 
} from '../../reducers/monsters/monsters.actions.extended';
import { 
  selectRandomMonster, 
  selectWinner 
} from '../../reducers/monsters/monsters.selectors.extended';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.extended.styled';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const computerMonster = useSelector(selectRandomMonster);
  const winner = useSelector(selectWinner);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMonster && monsters.length > 0) {
      const availableMonsters = monsters.filter(
        monster => monster.id !== selectedMonster.id
      );
      
      if (availableMonsters.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMonsters.length);
        const randomMonster = availableMonsters[randomIndex];
        dispatch(setRandomMonster(randomMonster));
      }
    } else {
      dispatch(setRandomMonster(null));
    }
  }, [selectedMonster, monsters, dispatch]);

  const handleStartBattleClick = () => {
    if (selectedMonster && computerMonster) {
      dispatch(fetchBattleWins({
        monster1Id: selectedMonster.id,
        monster2Id: computerMonster.id
      }));
    }
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winner && (
        <WinnerDisplay text={winner.winner ? winner.winner.name : 'It\'s a tie!'} />
      )}

      <BattleSection>
        <MonsterBattleCard
          monster={selectedMonster}
          title="Player" />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null || computerMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard 
          monster={computerMonster}
          title="Computer" />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
