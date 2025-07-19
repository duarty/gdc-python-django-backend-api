import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  Line,
  MonsterContainer,
  MonsterImage,
  MonsterName,
  ProgressBar,
  StatBox,
  StatLabel,
  StatsContainer,
} from './MonsterBattleCard.extended.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  if (!monster) {
    return (
      <BattleMonsterCard centralized>
        <BattleMonsterTitle>{title!}</BattleMonsterTitle>
      </BattleMonsterCard>
    );
  }

  return (
    <BattleMonsterCard>
      <MonsterContainer>

        <MonsterImage
          src={monster.imageUrl}
          alt={monster.name}
        />

        <MonsterName>{monster.name}</MonsterName>
        <Line />
        <StatsContainer>
          <StatBox>
            <StatLabel variant="body2">
              HP
            </StatLabel>
            <ProgressBar variant="determinate" value={monster.hp} />
          </StatBox>

          <StatBox>
            <StatLabel variant="body2">
              Attack
            </StatLabel>
            <ProgressBar variant="determinate" value={monster.attack} />
          </StatBox>

          <StatBox>
            <StatLabel variant="body2">
              Defense
            </StatLabel>
            <ProgressBar variant="determinate" value={monster.defense} />
          </StatBox>

          <StatBox>
            <StatLabel variant="body2">
              Speed
            </StatLabel>
            <ProgressBar variant="determinate" value={monster.speed} />
          </StatBox>
        </StatsContainer>
      </MonsterContainer>
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
