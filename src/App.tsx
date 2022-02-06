import { useReducer, Dispatch, useEffect } from 'react';
import './App.css'

type State = {
  opponentName: string,
  opponentLife: number,
  round: number
}

const initialState: State = {
  opponentName: 'Monokuma',
  opponentLife: 100,
  round: 0
}

enum ActionKind {
  Attack = 'ATTACK',
  HeavyAttack = 'HEAVY_ATTACK',
  MagicAttack = 'MAGIC_ATTACK',
  Reset = 'RESET'
}

type Action = {
  type: ActionKind,
  payload?: number
}

const attackAction: Action = {
  type: ActionKind.Attack,
  payload: 5
}

const heavyAttackAction: Action = {
  type: ActionKind.HeavyAttack,
  payload: 10
}

const magicAttackAction: Action = {
  type: ActionKind.MagicAttack,
  payload: 7.5
}

const resetAction: Action = {
  type: ActionKind.Reset
}

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  attack: () => dispatch(attackAction),
  heavyAttack: () => dispatch(heavyAttackAction),
  magicAttack: () => dispatch(magicAttackAction),
  reset: () => dispatch(resetAction)
})

function battleReducer(state: State, action: Action): State {
  const { type, payload } = action;
  const opponentDefeated: State = {
    ...state, 
    opponentLife: 0, 
    round: 777
  };
  const playerAttack: State = {
    ...state, 
    opponentLife: state.opponentLife - (payload || 0),
    round: state.round + 1
  };

  switch (type) {
    case ActionKind.Attack:
      if (state.opponentLife < 5)
        return opponentDefeated;
      return playerAttack;
    case ActionKind.HeavyAttack:
      if (state.opponentLife < 10)
        return opponentDefeated;
      return playerAttack;
    case ActionKind.MagicAttack:
      if (state.opponentLife < 7.5)
        return opponentDefeated;
      return playerAttack;
    case ActionKind.Reset:
      return initialState;
    default:
      return state;
  };
};

function App() {
  const [{ opponentName, opponentLife, round }, dispatch] = useReducer(battleReducer, initialState);
  const actions = mapDispatch(dispatch);

  useEffect(() => {
    console.log('The current round is:', round)
    console.log(`${opponentName} life is:`, opponentLife);

    if (opponentLife === 0) {
      console.log('%cPlayer victory. You won!', 'font-weight: bold');
      console.log("Reseting...");
      setTimeout(() => {
        actions.reset();
      }, 3000);
    }
  }, [opponentLife])


  return (
    <div className="battle-grid">

      {/* ROW 1 */}
      <div className="opponent">
        <div className="opponent-status">{opponentName}</div>
        <div className="opponent-life">🧡{opponentLife}</div>
      </div>
    
      {/* ROW 2 */}
      <button className="battle-button" onClick={actions.attack}>Attack</button>

      {/* ROW 3 */}
      <button className="battle-button" onClick={actions.heavyAttack}>Heavy Attack</button>

      {/* ROW 4 */}
      <button className="battle-button" onClick={actions.magicAttack}>Magic Attack</button>      

      {/* ROW 5 */}
      <button className="battle-button" onClick={actions.reset}>Reset</button>

    </div>
  )
}

export default App