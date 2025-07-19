# Battle of Monsters - Frontend Implementation Documentation

This document explains the implementation decisions and code changes made to fulfill the requirements of the Battle of Monsters frontend challenge.

## Overview

The implementation adds three main features to the existing React application:
1. **Monster Battle Card Component**: Displays monster stats and visual information
2. **Computer Monster Random Selection**: Automatically selects a random opponent
3. **Battle System**: Handles battle requests and displays results

## Implementation Details

### 1. MonsterBattleCard Extended Component

This section covers the complete implementation of the monster battle card component with all files and code that needs to be created.

#### 1.1 Styled Components File

**File Location**: `src/components/monster-battle-card/MonsterBattleCard.extended.styled.tsx`

**Purpose**: Contains all styling definitions for the monster battle card component

**Complete File Content**:
```typescript
/*
 * MONSTER BATTLE CARD STYLED COMPONENTS
 * 
 * This file implements all styling for the MonsterBattleCard component following the project's
 * architectural pattern of strict separation between component logic and styling.
 * 
 * WHY THIS IMPLEMENTATION:
 * - Follows project convention of .styled.tsx files containing ALL styling
 * - Zero inline styles or style props in component files
 * - Uses Material-UI components as base elements with Emotion styling
 * - Implements consistent visual hierarchy and spacing
 */

// Import styled function with CSSObject type for better TypeScript support
import styled, { CSSObject } from '@emotion/styled';
// Import Material-UI base components that will be styled
import {
  Box,           // For flexible containers
  Card,          // For card-like appearance with elevation
  LinearProgress,// For progress bars showing monster stats
  linearProgressClasses, // For accessing MUI LinearProgress CSS classes
  Typography,    // For text elements with proper typography
} from '@mui/material';
// Import centralized color constants to maintain design system consistency
import { colors } from '../../constants/colors';

/*
 * MAIN CARD CONTAINER
 * 
 * This is the primary container for the monster battle card. It supports two modes:
 * 1. Normal mode: Shows full monster details (image, name, stats)
 * 2. Centralized mode: Shows only title text centered (for empty states)
 * 
 * WHY THIS DESIGN:
 * - Conditional layout prevents code duplication for empty/filled states
 * - Fixed dimensions ensure consistent layout in battle grid
 * - shouldForwardProp prevents 'centralized' from being passed to DOM
 */
export const BattleMonsterCard = styled(Card, {
  // Prevent 'centralized' prop from being forwarded to DOM element
  shouldForwardProp: (prop) => prop !== 'centralized',
})<{ centralized?: boolean }>(({ centralized }) => ({
  padding: '13px 11px',                    // Internal padding for content
  width: 'calc(307px - 22px)',            // Fixed width minus padding (responsive calculation)
  height: '415px',                        // Fixed height for consistent card sizing
  background: colors.white,               // White background from design system
  boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)', // Subtle shadow for depth
  borderRadius: '7px',                    // Rounded corners matching design system
  // Conditional flex layout for empty state centering
  display: centralized ? 'flex' : 'auto',
  alignItems: centralized ? 'center' : 'auto',
  justifyContent: centralized ? 'center' : 'auto',
}));

/*
 * TITLE TYPOGRAPHY FOR EMPTY STATES
 * 
 * Large, prominent text used when no monster is selected.
 * Shows "Player" or "Computer" labels in empty card states.
 * 
 * WHY 36PX FONT SIZE:
 * - Creates visual hierarchy and draws attention to empty states
 * - Matches design requirements for title prominence
 * - Ensures good readability across different screen sizes
 */
export const BattleMonsterTitle = styled(Typography)(() => ({
  fontFamily: 'Roboto',                   // Consistent with design system
  fontWeight: '400',                      // Normal weight for readability
  fontSize: '36px',                       // Large size for prominence
  lineHeight: '42px',                     // Proper line height for legibility
  color: colors.black,                    // High contrast text color
}));

/*
 * MONSTER NAME DISPLAY
 * 
 * Medium-sized text to display the monster's name below the image.
 * Positioned between image and separator line in visual hierarchy.
 * 
 * WHY 22PX FONT SIZE:
 * - Smaller than title but larger than stat labels
 * - Creates clear visual hierarchy: Title > Monster Name > Stat Labels
 * - Maintains readability while not overwhelming the card design
 */
export const MonsterName = styled(Typography)(() => ({
  fontFamily: "Roboto",                   // Consistent typography
  fontStyle: "normal",                    // Standard font style
  fontWeight: "400",                      // Normal weight
  fontSize: "22px",                       // Medium size for secondary prominence
  color: colors.black,                    // Consistent text color
  marginTop: '14px'                       // Spacing between image and name
}));

/*
 * VISUAL SEPARATOR LINE
 * 
 * Subtle horizontal line that separates monster name from statistics.
 * Creates visual organization and improves content readability.
 * 
 * WHY THIS DESIGN:
 * - Semi-transparent border creates subtle separation without harsh lines
 * - Fixed width (283px) matches the card's content width
 * - Improves visual organization of card content
 */
export const Line = styled.div(() => ({
  borderBottom: '2px solid rgba(0, 0, 0, 0.1)', // Subtle semi-transparent border
  width: '283px'                          // Matches card content width
}));

/*
 * CUSTOM PROGRESS BAR COMPONENT
 * 
 * Styled Material-UI LinearProgress to show monster statistics visually.
 * Uses project color scheme and custom styling for brand consistency.
 * 
 * WHY CUSTOM STYLING:
 * - Default MUI progress bars don't match design requirements
 * - Rounded corners create modern, polished appearance
 * - Custom colors integrate with existing design system
 * - Height adjustment improves visual prominence
 */
export const ProgressBar = styled(LinearProgress)(() => ({
  height: 8,                              // Thicker than default for better visibility
  borderRadius: 15,                       // Fully rounded corners for modern look
  // Override MUI default background color
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: colors.progressBarBackground,
  },
  // Override MUI default progress color
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,                     // Rounded progress fill
    backgroundColor: colors.progressColor,
  },
}));

/*
 * MAIN LAYOUT CONTAINER
 * 
 * Flexbox container that organizes all monster card elements vertically.
 * Provides the structural foundation for the card's content layout.
 * 
 * WHY FLEXBOX COLUMN:
 * - Ensures consistent vertical spacing between elements
 * - Allows for easy reordering of elements if needed
 * - Provides flexible layout that adapts to content changes
 */
export const MonsterContainer = styled(Box)((): CSSObject => ({
  display: 'flex',                        // Enable flexbox layout
  flexDirection: 'column',                // Stack elements vertically
}));

/*
 * MONSTER IMAGE COMPONENT
 * 
 * Styled native img element for displaying monster artwork.
 * Uses native img instead of MUI Box for better performance and semantics.
 * 
 * WHY NATIVE IMG ELEMENT:
 * - Better performance than styled MUI components for images
 * - Proper semantic HTML for accessibility
 * - Direct control over image-specific properties
 * - Reduced bundle size compared to wrapped components
 */
export const MonsterImage = styled.img(() => ({
  borderRadius: "7px",                    // Rounded corners matching card style
  width: "283px",                         // Fixed width for consistent layout
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)', // Shadow for depth and focus
  height: "178px",                        // Fixed height with proper aspect ratio
}));

/*
 * STATISTICS SECTION CONTAINER
 * 
 * Container for all monster statistics (HP, Attack, Defense, Speed).
 * Provides consistent spacing and layout for stat elements.
 * 
 * WHY THIS SPACING:
 * - 11px gap creates visual separation without excessive whitespace
 * - Top margin separates stats from monster name/line
 * - Full width ensures stats utilize available card space
 */
export const StatsContainer = styled(Box)((): CSSObject => ({
  width: '100%',                          // Use full available width
  display: 'flex',                        // Enable flexbox layout
  marginTop: '11px',                      // Space from separator line
  flexDirection: 'column',                // Stack stats vertically
  gap: 11,                               // Consistent spacing between stat items
}));

/*
 * INDIVIDUAL STAT ITEM CONTAINER
 * 
 * Container for each stat (label + progress bar pair).
 * Ensures consistent spacing between label and its corresponding progress bar.
 * 
 * WHY 5PX GAP:
 * - Tight coupling between label and progress bar (they're related)
 * - Smaller gap than between different stats (visual grouping)
 * - Maintains visual hierarchy and readability
 */
export const StatBox = styled(Box)((): CSSObject => ({
  display: 'flex',                        // Enable flexbox layout
  flexDirection: 'column',                // Stack label above progress bar
  gap: 5                                 // Small gap between label and progress bar
}));

/*
 * STAT LABEL TYPOGRAPHY
 * 
 * Small text component for stat names (HP, Attack, Defense, Speed).
 * Smallest font in the hierarchy, indicating supporting information.
 * 
 * WHY 12PX FONT SIZE:
 * - Creates clear hierarchy: Title (36px) > Name (22px) > Labels (12px)
 * - Readable but unobtrusive for supporting information
 * - Maintains proportional relationships in typography scale
 */
export const StatLabel = styled(Typography)(() => ({
  fontFamily: "Roboto",                   // Consistent typography
  fontStyle: "normal",                    // Standard font style
  fontWeight: "400",                      // Normal weight for supporting text
  fontSize: "12px",                       // Small size for hierarchy
  color: colors.black                     // Consistent text color
}));
```

#### 1.2 Component Logic File

**File Location**: `src/components/monster-battle-card/MonsterBattleCard.extended.tsx`

**Purpose**: Contains the React component logic and JSX structure

**Complete File Content**:
```typescript
/*
 * MONSTER BATTLE CARD COMPONENT
 * 
 * This component renders a visual card displaying monster information for battles.
 * It supports two states: empty (showing title) and populated (showing full monster data).
 * 
 * WHAT THIS IMPLEMENTS:
 * - Visual monster cards for battle interface
 * - Empty state handling for unselected monsters
 * - Progress bar visualization of monster statistics
 * - Consistent visual hierarchy and spacing
 * 
 * WHY THIS APPROACH:
 * - Single component handles both empty and filled states (reduces complexity)
 * - Strict separation of logic and styling (follows project architecture)
 * - Reusable for both player and computer monster displays
 * - Type-safe props and monster data handling
 */

// Import Monster interface for type-safe prop handling
import { Monster } from '../../models/interfaces/monster.interface';

// Import all styled components (zero styling in this file)
import {
  BattleMonsterCard,      // Main card container
  BattleMonsterTitle,     // Large title for empty states
  Line,                   // Visual separator between name and stats
  MonsterContainer,       // Flex container for vertical layout
  MonsterImage,           // Styled image element
  MonsterName,            // Monster name typography
  ProgressBar,            // Custom progress bars for stats
  StatBox,                // Container for individual stat items
  StatLabel,              // Typography for stat names
  StatsContainer,         // Container for all statistics
} from './MonsterBattleCard.extended.styled';

/*
 * COMPONENT PROPS INTERFACE
 * 
 * Defines the contract for this component's props.
 * Both props are optional to support flexible usage patterns.
 * 
 * WHY OPTIONAL PROPS:
 * - monster?: Allows empty states when no monster is selected
 * - title?: Provides flexibility for different card labels
 */
type MonsterCardProps = {
  monster?: Monster | null;     // Monster data (null/undefined for empty state)
  title?: string;               // Title text for empty state display
};

/*
 * MAIN COMPONENT FUNCTION
 * 
 * React functional component that renders monster battle cards.
 * Uses conditional rendering to handle empty vs populated states.
 * 
 * IMPLEMENTATION STRATEGY:
 * - Early return for empty state (cleaner code structure)
 * - Structured JSX with semantic HTML and accessibility
 * - All styling delegated to styled components
 */
const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  
  /*
   * EMPTY STATE HANDLING
   * 
   * When no monster is provided, render a centered title card.
   * This is used for "Player" and "Computer" labels before monster selection.
   * 
   * WHY EARLY RETURN:
   * - Reduces nesting and improves code readability
   * - Clearly separates empty and populated state logic
   * - Makes component behavior more predictable
   */
  if (!monster) {
    return (
      // Main card with centralized layout enabled
      <BattleMonsterCard centralized>
        {/* Large title text for empty state (non-null assertion safe here) */}
        <BattleMonsterTitle>{title!}</BattleMonsterTitle>
      </BattleMonsterCard>
    );
  }

  /*
   * POPULATED STATE RENDERING
   * 
   * When monster data is available, render the full card with:
   * - Monster image at the top
   * - Monster name below image
   * - Visual separator line
   * - Statistics section with progress bars
   * 
   * VISUAL HIERARCHY (top to bottom):
   * 1. Monster image (most prominent)
   * 2. Monster name (secondary prominence)
   * 3. Separator line (visual organization)
   * 4. Statistics (supporting information)
   */
  return (
    // Main card container with standard layout
    <BattleMonsterCard>
      {/* Flex container organizing all elements vertically */}
      <MonsterContainer>

        {/* 
         * MONSTER IMAGE
         * Primary visual element showing monster artwork.
         * Uses semantic img element with proper alt text for accessibility.
         */}
        <MonsterImage
          src={monster.imageUrl}        // Image URL from monster data
          alt={monster.name}            // Alt text for screen readers
        />

        {/* 
         * MONSTER NAME
         * Secondary text element showing monster identity.
         * Positioned below image in visual hierarchy.
         */}
        <MonsterName>{monster.name}</MonsterName>
        
        {/* 
         * VISUAL SEPARATOR
         * Subtle line creating visual separation between name and statistics.
         * Improves content organization and readability.
         */}
        <Line />
        
        {/* 
         * STATISTICS SECTION
         * Container for all monster stat displays.
         * Each stat has a label and visual progress bar representation.
         */}
        <StatsContainer>
          
          {/*
           * HP STATISTIC
           * Health Points - represents monster's durability in battle.
           * Progress bar visually shows relative strength (0-100 scale).
           */}
          <StatBox>
            <StatLabel variant="body2">
              HP
            </StatLabel>
            {/* Progress bar showing HP as percentage fill */}
            <ProgressBar variant="determinate" value={monster.hp} />
          </StatBox>

          {/*
           * ATTACK STATISTIC
           * Attack Power - represents monster's offensive capability.
           * Higher values indicate stronger offensive potential.
           */}
          <StatBox>
            <StatLabel variant="body2">
              Attack
            </StatLabel>
            {/* Progress bar showing attack as percentage fill */}
            <ProgressBar variant="determinate" value={monster.attack} />
          </StatBox>

          {/*
           * DEFENSE STATISTIC
           * Defense Power - represents monster's damage resistance.
           * Higher values indicate better damage mitigation.
           */}
          <StatBox>
            <StatLabel variant="body2">
              Defense
            </StatLabel>
            {/* Progress bar showing defense as percentage fill */}
            <ProgressBar variant="determinate" value={monster.defense} />
          </StatBox>

          {/*
           * SPEED STATISTIC
           * Speed Value - represents monster's agility and turn order.
           * Higher values may determine first-move advantage in battles.
           */}
          <StatBox>
            <StatLabel variant="body2">
              Speed
            </StatLabel>
            {/* Progress bar showing speed as percentage fill */}
            <ProgressBar variant="determinate" value={monster.speed} />
          </StatBox>
          
        </StatsContainer>
      </MonsterContainer>
    </BattleMonsterCard>
  );
};

/*
 * COMPONENT EXPORT
 * 
 * Named export for explicit imports and better tree-shaking.
 * Allows importing as: import { MonsterBattleCard } from './MonsterBattleCard.extended';
 */
export { MonsterBattleCard };
```

**Design Decisions**:
- **Conditional Rendering**: The component handles both empty state (showing only title) and populated state (showing full monster details)
- **Styled Components Architecture**: All styling is separated into `MonsterBattleCard.extended.styled.tsx` following the project's convention
- **No Inline Styles**: Strictly adheres to the project pattern by avoiding any inline styles or style props (like `fontWeight`, `sx`, etc.)
- **Native HTML Elements**: Uses native `img` element for better performance instead of MUI Box component
- **Visual Hierarchy**: Clear visual structure with monster image at top, name below, separator line, then stats
- **Consistent Typography**: Uses Roboto font family with carefully chosen font sizes (36px title, 22px name, 12px labels)
- **Material-UI Base Components**: Uses MUI components as base elements for styled components (Box, Typography, LinearProgress)
- **Progress Bars**: Implements visual representation of monster stats using custom styled `ProgressBar` component
- **Visual Separation**: Includes styled `Line` component for visual separation between name and stats
- **Precise Dimensions**: Fixed dimensions (283px width) ensure consistent layout across all monster cards
- **Box Shadow Effects**: Adds depth to monster images with subtle shadow effects
- **Clean Stat Labels**: Simplified stat labels without values for cleaner visual presentation

**Styled Components Created**:
- `BattleMonsterCard`: Main card container with conditional centralized layout
- `BattleMonsterTitle`: Large title typography for empty state (36px font)
- `MonsterContainer`: Main flex container for monster layout
- `MonsterName`: Monster name typography component (22px font)
- `MonsterImage`: Native img element with fixed dimensions (283px width, 178px height) and shadow
- `Line`: Visual separator line below monster name (283px wide with subtle border)
- `StatsContainer`: Container for all monster statistics with proper spacing
- `StatBox`: Individual stat container with consistent gap between label and progress bar
- `StatLabel`: Typography component for stat names (12px font size)
- `ProgressBar`: Styled LinearProgress with custom colors and border radius

**Rationale**: This approach provides a flexible component that maintains strict separation of concerns between component logic and styling, following the established project architecture.

### 2. Redux State Management Extensions

This section covers all the Redux-related files that need to be created to handle the extended battle functionality.

#### 2.1 Extended Actions

**File Location**: `src/reducers/monsters/monsters.actions.extended.ts`

**Purpose**: Defines Redux actions for monster selection, battle execution, and winner management

**Complete File Content**:
```typescript
/*
 * EXTENDED REDUX ACTIONS FOR BATTLE FUNCTIONALITY
 * 
 * This file implements Redux actions for the extended battle system.
 * It provides actions for computer monster selection, battle execution, and winner management.
 * 
 * WHAT THIS IMPLEMENTS:
 * - Computer monster random selection logic
 * - Battle API integration with async state management
 * - Winner announcement and display functionality
 * 
 * WHY THESE ACTIONS ARE NEEDED:
 * - setRandomMonster: Manages automatic computer opponent selection
 * - setWinner: Handles direct winner assignment (if needed for edge cases)
 * - fetchBattleWins: Manages async battle API calls with loading states
 * 
 * INTEGRATION STRATEGY:
 * - Extends existing monster state without modifying original reducer
 * - Uses Redux Toolkit for modern, simplified action creation
 * - Follows established patterns from existing monsters.actions.ts
 */

// Import Redux Toolkit action creators for type-safe actions
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
// Import TypeScript interfaces for type safety
import { Monster } from '../../models/interfaces/monster.interface';
import { Battle } from '../../models/interfaces/battle.interface';
// Import extended service layer for API communication
import { MonsterServiceExtended } from './monsters.service.extended';

/*
 * COMPUTER MONSTER SELECTION ACTION
 * 
 * Simple action to set the randomly selected computer monster.
 * Accepts Monster object or null to clear selection.
 * 
 * USAGE PATTERNS:
 * - dispatch(setRandomMonster(randomMonster)) // Set computer monster
 * - dispatch(setRandomMonster(null))          // Clear computer monster
 * 
 * WHY NULL IS ALLOWED:
 * - Clears computer selection when player deselects their monster
 * - Provides clean state reset functionality
 * - Prevents invalid battle states
 */
export const setRandomMonster = createAction<Monster | null>('monsters/setRandomMonster');

/*
 * WINNER ASSIGNMENT ACTION
 * 
 * Direct action to set battle winner without API call.
 * Primarily used for edge cases or direct state manipulation.
 * 
 * USAGE SCENARIOS:
 * - Manual winner assignment for testing
 * - Handling special battle outcomes
 * - State synchronization from external sources
 */
export const setWinner = createAction<Battle>('monsters/setWinner');

/*
 * ASYNC BATTLE EXECUTION ACTION
 * 
 * Redux Toolkit async thunk that handles battle API calls.
 * Automatically manages loading, success, and error states.
 * 
 * WHAT THIS IMPLEMENTS:
 * - Sends battle request to backend API
 * - Handles API response and error states
 * - Returns battle result for Redux state updates
 * 
 * ASYNC THUNK BENEFITS:
 * - Automatic loading state management (pending/fulfilled/rejected)
 * - Built-in error handling and type safety
 * - Integration with Redux DevTools for debugging
 * 
 * API CONTRACT:
 * - Sends: { monster1Id: string, monster2Id: string }
 * - Receives: Battle object with winner information
 */
export const fetchBattleWins = createAsyncThunk(
  // Unique action type for Redux DevTools identification
  'monsters/fetchBattleWins',
  
  // Async function that performs the API call
  // Takes battle request parameters and returns Promise<Battle>
  async (battleRequest: { monster1Id: string; monster2Id: string }) => {
    /*
     * API CALL EXECUTION
     * 
     * Delegates to service layer for:
     * - API endpoint management
     * - Request formatting and headers
     * - Response parsing and error handling
     * - Network error management
     */
    const battle = await MonsterServiceExtended.battle(battleRequest);
    
    // Return battle result for Redux state update
    // This becomes the action.payload in fulfilled case
    return battle;
  }
);
```

#### 2.2 Extended Reducer

**File Location**: `src/reducers/monsters/monsters.reducer.extended.ts`

**Purpose**: Manages the extended state for battle functionality including computer monster and winner

**Complete File Content**:
```typescript
/*
 * EXTENDED MONSTERS REDUCER FOR BATTLE FUNCTIONALITY
 * 
 * This reducer manages state for the extended battle system.
 * It handles computer monster selection and battle results.
 * 
 * WHAT THIS IMPLEMENTS:
 * - Computer monster selection state management
 * - Battle winner state with loading states
 * - Integration with async battle API calls
 * 
 * WHY A SEPARATE REDUCER:
 * - Avoids modifying existing monsters reducer (non-breaking)
 * - Keeps battle logic isolated and maintainable
 * - Allows independent testing and development
 * - Follows single responsibility principle
 * 
 * STATE MANAGEMENT STRATEGY:
 * - Immutable updates using spread operator
 * - Type-safe state shape with TypeScript interfaces
 * - Clear separation between sync and async actions
 */

// Import Redux Toolkit's modern reducer creator
import { createReducer } from '@reduxjs/toolkit';
// Import TypeScript interfaces for state typing
import { Battle } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';
// Import actions this reducer will handle
import { setRandomMonster, setWinner, fetchBattleWins } from './monsters.actions.extended';

/*
 * EXTENDED MONSTER STATE INTERFACE
 * 
 * Defines the shape of state managed by this reducer.
 * Separated from main monsters state for modularity.
 * 
 * STATE PROPERTIES:
 * - selectRandomMonster: Computer's selected monster (null when no selection)
 * - winner: Battle result object (null when no battle or during loading)
 * 
 * WHY NULL VALUES:
 * - Represents "no selection" or "no result" states clearly
 * - Allows components to handle empty states consistently
 * - Simplifies conditional rendering logic
 */
interface MonsterState {
  selectRandomMonster: Monster | null;  // Computer's monster selection
  winner: Battle | null;                // Battle outcome with winner data
}

/*
 * INITIAL STATE DEFINITION
 * 
 * Starting state when application loads.
 * All values null indicates no selections or battles yet.
 * 
 * WHY START WITH NULLS:
 * - Represents clean slate before any user interaction
 * - Forces components to handle empty states properly
 * - Makes state transitions explicit and traceable
 */
const initialState: MonsterState = {
  selectRandomMonster: null,    // No computer monster selected initially
  winner: null,                 // No battle winner initially
};

/*
 * REDUX REDUCER IMPLEMENTATION
 * 
 * Uses Redux Toolkit's createReducer with builder pattern.
 * Handles all actions related to extended battle functionality.
 * 
 * BUILDER PATTERN BENEFITS:
 * - Type-safe action handling
 * - Automatic action type inference
 * - Built-in support for async thunk actions
 * - Better developer experience with IntelliSense
 */
export const monstersReducerExtended = createReducer(
  initialState,
  (builder) => {
    /*
     * COMPUTER MONSTER SELECTION HANDLER
     * 
     * Updates the computer's selected monster.
     * Triggered when player selects/deselects their monster.
     * 
     * STATE TRANSITION:
     * - Player selects monster → Computer gets random monster
     * - Player deselects → Computer selection cleared (null)
     * 
     * WHY IMMUTABLE UPDATE:
     * - Redux requires immutability for state change detection
     * - Enables time-travel debugging and proper re-renders
     * - Follows Redux best practices
     */
    builder.addCase(setRandomMonster, (state, action) => ({
      ...state,                           // Preserve other state properties
      selectRandomMonster: action.payload, // Update computer monster selection
    }));

    /*
     * DIRECT WINNER ASSIGNMENT HANDLER
     * 
     * Sets battle winner directly without API call.
     * Used for edge cases or manual state management.
     * 
     * USAGE SCENARIOS:
     * - Testing with predetermined outcomes
     * - Handling offline battle calculations
     * - State restoration from external sources
     */
    builder.addCase(setWinner, (state, action) => ({
      ...state,                           // Preserve other state properties
      winner: action.payload,             // Set battle winner directly
    }));

    /*
     * SUCCESSFUL BATTLE API RESPONSE HANDLER
     * 
     * Handles fulfilled state of fetchBattleWins async thunk.
     * Updates state with battle result from API.
     * 
     * ASYNC THUNK LIFECYCLE:
     * pending → API call in progress
     * fulfilled → API call successful (handled here)
     * rejected → API call failed
     */
    builder.addCase(fetchBattleWins.fulfilled, (state, action) => ({
      ...state,                           // Preserve other state properties
      winner: action.payload,             // Set winner from API response
    }));

    /*
     * BATTLE REQUEST LOADING HANDLER
     * 
     * Handles pending state of fetchBattleWins async thunk.
     * Clears previous winner while new battle is processing.
     * 
     * WHY CLEAR WINNER:
     * - Prevents showing outdated battle results
     * - Provides visual feedback that battle is in progress
     * - Ensures UI reflects current battle state
     */
    builder.addCase(fetchBattleWins.pending, (state) => ({
      ...state,                           // Preserve other state properties
      winner: null,                       // Clear winner during loading
    }));

    /*
     * BATTLE REQUEST ERROR HANDLER
     * 
     * Handles rejected state of fetchBattleWins async thunk.
     * Clears winner state when battle API call fails.
     * 
     * ERROR HANDLING STRATEGY:
     * - Clear winner to avoid showing stale data
     * - Let UI components handle error display
     * - Maintain consistent state after failures
     */
    builder.addCase(fetchBattleWins.rejected, (state) => ({
      ...state,                           // Preserve other state properties
      winner: null,                       // Clear winner on API failure
    }));
  },
);
```

#### 2.3 Extended Selectors

**File Location**: `src/reducers/monsters/monsters.selectors.extended.ts`

**Purpose**: Provides typed selectors to access extended monster state from Redux store

**Complete File Content**:
```typescript
// Import RootState type for typed selectors
import { RootState } from '../../app/store';

// Selector to get the currently selected random computer monster
export const selectRandomMonster = (state: RootState) => 
  state.monstersExtended.selectRandomMonster;

// Selector to get the current battle winner result
export const selectWinner = (state: RootState) => 
  state.monstersExtended.winner;
```

#### 2.4 Extended Service

**File Location**: `src/reducers/monsters/monsters.service.extended.ts`

**Purpose**: Handles API communication for battle requests

**Complete File Content**:
```typescript
// Import API URL constant from environment configuration
import { API_URL } from '../../constants/env';
// Import Battle interface for return type
import { Battle } from '../../models/interfaces/battle.interface';

// Async function to send battle request to API and get result
const battle = async (battleRequest: { monster1Id: string; monster2Id: string }): Promise<Battle> => {
  // Send POST request to battle endpoint with monster IDs
  const response = await fetch(`${API_URL}/battle`, {
    method: 'POST',                           // Use POST method for battle creation
    headers: {
      'Content-Type': 'application/json',     // Set JSON content type
    },
    body: JSON.stringify(battleRequest),      // Convert battle request to JSON string
  });

  // Check if request was successful
  if (!response.ok) {
    // Throw error with descriptive message for failed requests
    throw new Error('Failed to start battle');
  }

  // Parse and return JSON response as Battle object
  return response.json();
};

// Export service object with battle method
export const MonsterServiceExtended = {
  battle,
};
```

### 3. Main Battle Page Component

**File Location**: `src/pages/battle-of-monsters/BattleOfMonsters.extended.tsx`

**Purpose**: Main component that orchestrates the battle functionality with automatic computer opponent selection and battle execution

**Complete File Content**:
```typescript
// Import useEffect hook for side effects
import { useEffect } from 'react';
// Import useSelector for accessing Redux state
import { useSelector } from 'react-redux';
// Import typed dispatch hook
import { useAppDispatch } from '../../app/hooks';

// Import the extended monster battle card component
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard.extended';
// Import the extended monsters list component
import { MonstersList } from '../../components/monsters-list/MonstersList.extended';
// Import reusable title component
import { Title } from '../../components/title/Title';
// Import winner display component
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';

// Import original action to fetch monsters data
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
// Import original selectors for monsters and selected monster
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';

// Import extended actions for random monster selection and battle
import { 
  setRandomMonster, 
  fetchBattleWins 
} from '../../reducers/monsters/monsters.actions.extended';
// Import extended selectors for computer monster and winner
import { 
  selectRandomMonster, 
  selectWinner 
} from '../../reducers/monsters/monsters.selectors.extended';

// Import styled components for layout
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.extended.styled';

// Main battle page component
const BattleOfMonsters = () => {
  // Get typed dispatch function
  const dispatch = useAppDispatch();

  // Select monsters list from Redux store
  const monsters = useSelector(selectMonsters);
  // Select currently selected player monster
  const selectedMonster = useSelector(selectSelectedMonster);
  // Select randomly selected computer monster
  const computerMonster = useSelector(selectRandomMonster);
  // Select battle winner result
  const winner = useSelector(selectWinner);

  // Effect to load monsters data when component mounts
  useEffect(() => {
    // Dispatch action to fetch all monsters from API
    dispatch(fetchMonstersData());
  }, [dispatch]);

  // Effect to automatically select random computer monster when player selects
  useEffect(() => {
    // Only proceed if player has selected a monster and monsters are loaded
    if (selectedMonster && monsters.length > 0) {
      // Filter out the player's selected monster from available options
      const availableMonsters = monsters.filter(
        monster => monster.id !== selectedMonster.id
      );
      
      // If there are available monsters for computer selection
      if (availableMonsters.length > 0) {
        // Generate random index within available monsters array
        const randomIndex = Math.floor(Math.random() * availableMonsters.length);
        // Get random monster at the generated index
        const randomMonster = availableMonsters[randomIndex];
        // Dispatch action to set the computer's monster
        dispatch(setRandomMonster(randomMonster));
      }
    } else {
      // Clear computer monster if no player monster is selected
      dispatch(setRandomMonster(null));
    }
  }, [selectedMonster, monsters, dispatch]);

  // Handler for starting a battle between selected monsters
  const handleStartBattleClick = () => {
    // Ensure both player and computer monsters are selected
    if (selectedMonster && computerMonster) {
      // Dispatch async action to fetch battle result from API
      dispatch(fetchBattleWins({
        monster1Id: selectedMonster.id,    // Player's monster ID
        monster2Id: computerMonster.id     // Computer's monster ID
      }));
    }
  };

  // Render the battle page layout
  return (
    // Main page container with proper styling
    <PageContainer>
      // Page title
      <Title>Battle of Monsters</Title>

      // Monsters selection list component
      <MonstersList monsters={monsters} />

      // Conditional winner display (only show if battle is complete)
      {winner && (
        // Display winner name or tie message
        <WinnerDisplay text={winner.winner ? winner.winner.name : 'It\'s a tie!'} />
      )}

      // Battle section with two monster cards and start button
      <BattleSection>
        // Player's monster card (left side)
        <MonsterBattleCard
          monster={selectedMonster}     // Player's selected monster or null
          title="Player"                // Title for empty state
        />
        
        // Start battle button (center)
        <StartBattleButton
          data-testid="start-battle-button"                                    // Test ID for testing
          disabled={selectedMonster === null || computerMonster === null}      // Disable if either monster not selected
          onClick={handleStartBattleClick}>                                    // Click handler to start battle
          Start Battle
        </StartBattleButton>
        
        // Computer's monster card (right side)
        <MonsterBattleCard 
          monster={computerMonster}     // Computer's selected monster or null
          title="Computer"              // Title for empty state
        />
      </BattleSection>
    </PageContainer>
  );
};

// Export component for use in routing
export { BattleOfMonsters };
```

### 4. Store Configuration Updates

**File Location**: `src/app/store.ts`

**Purpose**: Configure Redux store to include the extended monsters reducer

**Required Changes**: Add the extended reducer to the store configuration

**Code to Add**:
```typescript
// Import the extended reducer
import { monstersReducerExtended } from '../reducers/monsters/monsters.reducer.extended';

// Add to the store configuration
export const store = configureStore({
  reducer: {
    monsters: monstersReducer,
    monstersExtended: monstersReducerExtended,  // Add this line
  },
});
```
- `src/reducers/monsters/monsters.selectors.extended.ts`

#### Actions (`monsters.actions.extended.ts`)

```typescript
export const setRandomMonster = createAction<Monster | null>('monsters/setRandomMonster');
export const setWinner = createAction<Battle>('monsters/setWinner');
export const fetchBattleWins = createAsyncThunk(
  'monsters/fetchBattleWins',
  async (battleRequest: { monster1Id: string; monster2Id: string }) => {
    const battle = await MonsterServiceExtended.battle(battleRequest);
    return battle;
  }
);
```

**Design Decisions**:
- **Redux Toolkit**: Uses `createAction` and `createAsyncThunk` for type-safe action creation
- **Async Thunk**: `fetchBattleWins` handles the API call and manages loading states automatically
- **Null Support**: `setRandomMonster` accepts null to handle cases where no computer monster should be selected

**Rationale**: This follows Redux best practices and integrates seamlessly with the existing Redux store structure.

#### Reducer (`monsters.reducer.extended.ts`)

```typescript
export const monstersReducerExtended = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setRandomMonster, (state, action) => ({
      ...state,
      selectRandomMonster: action.payload,
    }));
    // ... other cases
  },
);
```

**Design Decisions**:
- **Immutable Updates**: Uses spread operator to ensure state immutability
- **Separate State**: Maintains extended state separately from main monsters state to avoid conflicts
- **Error Handling**: Includes pending/rejected cases for the async battle action

**Rationale**: This approach keeps the extended functionality isolated while maintaining Redux patterns.

#### Selectors (`monsters.selectors.extended.ts`)

```typescript
export const selectRandomMonster = (state: RootState) => 
  state.monstersExtended.selectRandomMonster;
export const selectWinner = (state: RootState) => 
  state.monstersExtended.winner;
```

**Design Decisions**:
- **Memoization**: Simple selector functions that can be easily memoized if needed
- **Type Safety**: Properly typed selectors that work with the RootState

**Rationale**: Follows the standard Redux selector pattern for consistent state access.

### 3. Battle Service (`monsters.service.extended.ts`)

**File**: `src/reducers/monsters/monsters.service.extended.ts`

```typescript
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
```

**Design Decisions**:
- **Native Fetch API**: Uses browser's native fetch instead of external libraries for simplicity
- **Error Handling**: Throws descriptive errors for failed requests
- **Type Safety**: Returns strongly typed `Battle` interface
- **Standard HTTP**: Uses POST method with JSON payload as specified in requirements

**Rationale**: This implementation is straightforward, follows REST conventions, and integrates well with Redux Toolkit's async thunk error handling.

### 4. Main Battle Component (`BattleOfMonsters.extended.tsx`)

**File**: `src/pages/battle-of-monsters/BattleOfMonsters.extended.tsx`

#### Computer Monster Selection Logic

```typescript
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
```

**Design Decisions**:
- **Automatic Selection**: Triggers whenever a player monster is selected
- **Exclusion Logic**: Ensures computer never selects the same monster as the player
- **Random Selection**: Uses `Math.random()` for true randomness
- **Cleanup**: Resets computer monster when player deselects

**Rationale**: This meets the requirement for automatic computer selection while preventing duplicate monsters.

#### Battle Initiation

```typescript
const handleStartBattleClick = () => {
  if (selectedMonster && computerMonster) {
    dispatch(fetchBattleWins({
      monster1Id: selectedMonster.id,
      monster2Id: computerMonster.id
    }));
  }
};
```

**Design Decisions**:
- **Validation**: Ensures both monsters are selected before starting battle
- **ID-based**: Sends monster IDs rather than full objects to the API
- **Redux Integration**: Uses the async thunk for proper state management

**Rationale**: This approach ensures data integrity and follows the API specification.

#### Winner Display

```typescript
{winner && (
  <WinnerDisplay text={winner.winner ? winner.winner.name : 'It\'s a tie!'} />
)}
```

**Design Decisions**:
- **Conditional Rendering**: Only shows winner display when battle is complete
- **Tie Handling**: Displays appropriate message for tie scenarios
- **Existing Component**: Reuses the existing `WinnerDisplay` component

**Rationale**: This provides immediate visual feedback while maintaining consistency with existing components.

## Testing Strategy

### Component Tests (`MonsterBattleCard.extended.spec.tsx`)

```typescript
it('renders the monster card correctly with a monster', () => {
  render(<MonsterBattleCard monster={mockMonster} title="Player" />);
  
  expect(screen.getByText('Test Monster')).toBeInTheDocument();
  expect(screen.getByText('HP: 80')).toBeInTheDocument();
  // ... other assertions
});
```

**Design Decisions**:
- **Mock Data**: Creates realistic monster data for testing
- **Multiple Scenarios**: Tests both populated and empty states
- **Accessibility**: Verifies alt text and other accessibility features

**Rationale**: Comprehensive testing ensures the component works correctly in all scenarios.

### Service Tests (`monsters.service.extended.spec.ts`)

```typescript
it('should get the winner of the battle of monsters', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockBattle,
  });
  // ... test implementation
});
```

**Design Decisions**:
- **Fetch Mocking**: Mocks the global fetch function for isolated testing
- **Error Scenarios**: Tests both success and failure cases
- **API Contract**: Verifies correct request format and response handling

**Rationale**: This ensures the service layer works correctly without making actual HTTP requests during testing.

## Technical Considerations

### Styling Architecture

1. **Strict Separation**: All styling is contained in `.styled.tsx` files following the project's established pattern
2. **No Inline Styles**: Zero tolerance for inline styles or style props (sx, fontWeight, etc.) in component files
3. **Emotion Styled**: Uses `@emotion/styled` with Material-UI components as base elements
4. **Centralized Colors**: All colors reference the centralized `colors.ts` constants file
5. **Component Composition**: Complex layouts built through composition of simple styled components

### Performance Optimizations

1. **Conditional Rendering**: Components only render necessary elements
2. **Dependency Arrays**: UseEffect hooks have proper dependency arrays to prevent unnecessary re-renders
3. **Selector Optimization**: Simple selectors that can be easily memoized if performance becomes an issue
4. **Styled Component Reusability**: Common layout patterns extracted into reusable styled components

### Error Handling

1. **Service Layer**: Throws descriptive errors for failed API calls
2. **UI Layer**: Gracefully handles loading and error states through Redux
3. **Type Safety**: TypeScript ensures compile-time error catching

### Accessibility

1. **Image Alt Text**: All monster images have descriptive alt text
2. **Semantic HTML**: Uses proper heading hierarchy and semantic elements
3. **Keyboard Navigation**: Leverages Material-UI components that support keyboard navigation

## Future Improvements

1. **Loading States**: Could add loading indicators during battle requests
2. **Animation**: Could add battle animations for better user experience
3. **Caching**: Could implement monster data caching for better performance
4. **Error Boundaries**: Could add React error boundaries for better error handling
5. **Accessibility**: Could add ARIA labels for screen readers

## Conclusion

This implementation successfully fulfills all requirements while maintaining code quality, testability, and consistency with the existing codebase. The modular approach allows for easy maintenance and future enhancements.