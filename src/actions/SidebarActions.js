import { ActionTypes, LoadingStatus } from '../constants';
import SportActions from './SportActions';
import CompetitorActions from './CompetitorActions';
import EventGroupActions from './EventGroupActions';
import EventActions from './EventActions';
import BettingMarketGroupActions from './BettingMarketGroupActions';
import _ from 'lodash';
import Immutable from 'immutable';
import log from 'loglevel';

class SidebarActions{

  static getData() {
    return (dispatch) => {

      // Loading status
      dispatch(SidebarActions.setLoadingStatusAction(LoadingStatus.LOADING));
      let retrievedSportIds;
      // Get sports
      dispatch(SportActions.getAllSports()).then((sports) => {
        retrievedSportIds = sports.map( sport => sport.get('id'));
        const eventGroupIds = sports.flatMap( sport => sport.get('event_group_ids'));
        // Get event groups related to the sports
        return dispatch(EventGroupActions.getEventGroupsByIds(eventGroupIds));
      }).then((eventGroups) => {
        // Get competitiors related to the sports
        return dispatch(CompetitorActions.getCompetitorsBySportIds(retrievedSportIds));
      }).then((competitors) => {
        // Get events related to the sports (because we don't have get event based on event groups)
        return dispatch(EventActions.getActiveEventsBySportIds(retrievedSportIds));
      }).then((events) => {
        // Get betting market groups
        const bettingMarketGroupIds = events.flatMap( event => event.get('betting_market_group_ids'));
        return dispatch(BettingMarketGroupActions.getBettingMarketGroupsByIds(bettingMarketGroupIds));
      }).then((bettingMarketGroups) => {
        // Loading status
        dispatch(SidebarActions.setLoadingStatusAction(LoadingStatus.DONE));
        // TODO: There may be a synchronization problem here
        // TODO: This should be done in mapStateToProps of the Sidebar
        dispatch(SidebarActions.setTreeForSidebar());
      }).catch((error) => {
        log.error('Sidebar get data error', error);
        // Loading status
        dispatch(SidebarActions.setErrorAction(error));
      })

    };
  }


  // TODO: Should move the bulk of this logic to the mapStateToProps in Sidebar
  static setTreeForSidebar(){

    return (dispatch, getState) => {
      const sportsById = getState().getIn(['sport', 'sportsById']);
      const eventGroupsById = getState().getIn(['eventGroup', 'eventGroupsById']);
      const eventsById = getState().getIn(['event', 'eventsById']);
      const bettingMarketGroupsById = getState().getIn(['bettingMarketGroup', 'bettingMarketGroupsById']);

      const eventGroupsList = Immutable.List(eventGroupsById.values());
      const eventList = Immutable.List(eventsById.values());
      const bettingMktGroupList = Immutable.List(bettingMarketGroupsById.values());

      let completeTree = []

      //add hard code header "all sports"
      completeTree.push({
        name: "ALL SPORTS", /*require for menu lib */
        id: "0", /*require for menu lib */
        isOpen: false, /*optional for menu lib */
        isSelected: false, /*optional for node component  */
        customComponent: "Sport",  /*require for custom component*/
        objectId: "0",
        children: []  /*require for TreeUtil.js*/
      });

      sportsById.forEach((sport) => {

        let sportNode = {};

        sportNode.name = sport.get('name');
        sportNode.id = sport.get('id');
        sportNode.isOpen = false;
        sportNode.customComponent = "Sport";
        sportNode.objectId = sport.get('id');

        sportNode.children = [];


        const targetEventGroups = eventGroupsList.filter(function(metric) {
          return metric.get('sport_id') === sport.get('id');
        })
        _.forEach(targetEventGroups.toJS(), (eventGroup) => {

          let eventGroupNode = {};
          eventGroupNode.name = eventGroup.name;
          eventGroupNode.id = eventGroup.id;
          eventGroupNode.isOpen = false;
          eventGroupNode.customComponent = "EventGroup";
          eventGroupNode.objectId = eventGroup.id;
          eventGroupNode.children = [];

          const targetEvents = eventList.filter(function(metric) {
            return metric.get('event_group_id') === eventGroupNode.id;
          })
          _.forEach(targetEvents.toJS(), (event) => {

            const eventTime = event.start_time;
            const currentTime = new Date().getTime();
            const isEventActive = (eventTime - currentTime) > 0;
            if (isEventActive) {
              let eventNode = {};
              eventNode.name = event.name;
              eventNode.id = event.id;
              eventNode.isOpen = false;
              eventNode.customComponent = "Event";
              eventNode.objectId = event.id;
              eventNode.children = [];

              const targetBettingMktGps = bettingMktGroupList.filter(function(metric) {
                return metric.get('event_id') === eventNode.id;
              })
              _.forEach(targetBettingMktGps.toJS(), (mktGroup) => {

                let mktGroupNode = {};
                mktGroupNode.name = mktGroup.market_type_id;
                mktGroupNode.id = mktGroup.id;
                mktGroupNode.isOpen = false;
                mktGroupNode.customComponent = "BettingMarketGroup";
                mktGroupNode.market_type_id = mktGroup.market_type_id
                mktGroupNode.objectId = mktGroup.id;
                mktGroupNode.children = [];

                eventNode.children.push(mktGroupNode);

              })

              eventGroupNode.children.push(eventNode);
            }
          })

          sportNode.children.push(eventGroupNode);
        });

        completeTree.push(sportNode);
      });

      dispatch(SidebarActions.updateTree(completeTree));
    }
  }

  static updateTree(complete_tree) {
    return {
      type: ActionTypes.SIDEBAR_UPDATE_COMPLETE_TREE,
      complete_tree
    }
  }

  static setErrorAction(error) {
    return {
      type: ActionTypes.SIDEBAR_SET_ERROR,
      error
    }
  }

  static setLoadingStatusAction(loadingstatus) {
    return {
      type: ActionTypes.SIDEBAR_SET_LOADING_STATUS,
      loadingstatus
    }
  }

}

export default SidebarActions;
