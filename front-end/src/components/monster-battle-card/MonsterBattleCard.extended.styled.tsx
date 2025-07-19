import styled, { CSSObject } from '@emotion/styled';
import {
  Box,
  Card,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import { colors } from '../../constants/colors';

export const BattleMonsterCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'centralized',
})<{ centralized?: boolean }>(({ centralized }) => ({
  padding: '13px 11px',
  width: 'calc(307px - 22px)',
  height: '415px',
  background: colors.white,
  boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '7px',
  display: centralized ? 'flex' : 'auto',
  alignItems: centralized ? 'center' : 'auto',
  justifyContent: centralized ? 'center' : 'auto',
}));

export const BattleMonsterTitle = styled(Typography)(() => ({
  fontFamily: 'Roboto',
  fontWeight: '400',
  fontSize: '36px',
  lineHeight: '42px',
  color: colors.black,
}));

export const MonsterName = styled(Typography)(() => ({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "22px",
  color: colors.black,
  marginTop: '14px'
}));

export const Line = styled.div(() => ({
  borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
  width: '283px'
}));

export const ProgressBar = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: colors.progressBarBackground,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: colors.progressColor,
  },
}));

export const MonsterContainer = styled(Box)((): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
}));


export const MonsterImage = styled.img(() => ({
  borderRadius: "7px",
  width: "283px",
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  height: "178px",
}));

export const StatsContainer = styled(Box)((): CSSObject => ({
  width: '100%',
  display: 'flex',
  marginTop: '11px',
  flexDirection: 'column',
  gap: 11,
}));

export const StatBox = styled(Box)((): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 5
}));

export const StatLabel = styled(Typography)(() => ({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  color: colors.black
}));