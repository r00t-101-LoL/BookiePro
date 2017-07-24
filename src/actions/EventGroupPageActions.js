import { ActionTypes, LoadingStatus } from '../constants';
import EventActions from './EventActions';
import SportActions from './SportActions';
import EventGroupActions from './EventGroupActions';
import BettingMarketGroupActions from './BettingMarketGroupActions';
import BettingMarketActions from './BettingMarketActions';
import BinnedOrderBookActions from './BinnedOrderBookActions';
import _ from 'lodash';
import Immutable from 'immutable';
import log from 'loglevel';

class EventGroupPagePrivateActions {
  static setLoadingStatusAction(eventGroupId, loadingStatus) {
    return {
      type: ActionTypes.EVENT_GROUP_PAGE_SET_LOADING_STATUS,
      eventGroupId,
      loadingStatus
    }
  }

  static setErrorAction(eventGroupId, error) {
    return {
      type: ActionTypes.EVENT_GROUP_PAGE_SET_ERROR,
      eventGroupId,
      error
    }
  }

}

class EventGroupPageActions {
  static getData(eventGroupId) {
    return (dispatch, getState) => {
      // No need to fetch again if it's already fetched
      const eventGroupPageLoadingStatus = getState().getIn(['eventGroupPage', 'loadingStatusByEventGroupId', eventGroupId]);
      if (eventGroupPageLoadingStatus === LoadingStatus.DONE) {
        return;
      }

      dispatch(EventGroupPagePrivateActions.setLoadingStatusAction(eventGroupId, LoadingStatus.LOADING));

      let retrievedEventGroup;
      let retrievedSport;
      let retrievedEvents = Immutable.List();

      // Get event group
      dispatch(EventGroupActions.getEventGroupsByIds([eventGroupId])).then( eventGroups => {
        retrievedEventGroup = eventGroups.get(0);
        const sportId = retrievedEventGroup.get('sport_id');
        // Get sport
        return dispatch(SportActions.getSportsByIds([sportId]));
      }).then((sports) => {
        retrievedSport = sports.get(0);
        // Get events
        return dispatch(EventActions.getActiveEventsBySportIds([retrievedSport.get('id')]));
      }).then((events) => {
        retrievedEvents = events;
        // Get betting market groups
        const eventIds = retrievedEvents.map( event => event.get('id'));
        return dispatch(BettingMarketGroupActions.getBettingMarketGroupsByEventIds(eventIds));
      }).then((bettingMarketGroups) => {
        // Get betting markets
        const bettingMarketGroupIds = bettingMarketGroups.map( bettingMarketGroup => bettingMarketGroup.get('id'));
        return dispatch(BettingMarketActions.getBettingMarketsByBettingMarketGroupIds(bettingMarketGroupIds));
      }).then((bettingMarkets) => {
        // Get binned order books
        const bettingMarketIds = bettingMarkets.map( bettingMarket => bettingMarket.get('id'));
        return dispatch(BinnedOrderBookActions.getBinnedOrderBooksByBettingMarketIds(bettingMarketIds));
      }).then((binnedOrderBooksByBettingMarketId) => {
        // Set status
        dispatch(EventGroupPagePrivateActions.setLoadingStatusAction(eventGroupId, LoadingStatus.DONE));
      }).catch((error) => {
        log.error('Event sport page get data error', eventGroupId, error);
        dispatch(EventGroupPagePrivateActions.setErrorAction(eventGroupId, error));
      });
    }
  }
}

export default EventGroupPageActions;
