import { ActionTypes } from '../constants';
import Immutable from 'immutable';

class QuickBetDrawerPrivateActions {
  static addQuickBet(bet) {
    return {
      type: ActionTypes.QUICK_BET_DRAWER_ADD_QUICK_BET,
      bet
    };
  }
}

class QuickBetDrawerActions {
  static createBet(record, team, marketType, offer) {
    return (dispatch) => {
      console.log('QuickBetDrawerActions create_bet', record, team, marketType, offer);
      const bet = Immutable.fromJS({
        event_id: record.get('id'),
        event_name: record.get('name'),
        team_name: team,
        market_type: marketType,
        offer: offer
      });
      dispatch(QuickBetDrawerPrivateActions.addQuickBet(bet));
    };
  }
}

export default QuickBetDrawerActions;
