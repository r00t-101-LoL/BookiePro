import _ from 'lodash';
import dummyData from '../dummyData';

const {
  sports,
  eventGroups,
  competitors,
  events,
  bets
} = dummyData;

const TIMEOUT_LENGTH = 500;

class FakeApi {
  static getObjects(arrayOfObjectIds = []) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredResult = [];
        // Iterate every object in dummy data to find the matching object
        _.forEach(dummyData, (category) => {
          _.forEach(category, (item) => {
            if (_.includes(arrayOfObjectIds, item.id)) {
              filteredResult.push(item);
            }
          })
        })
        resolve(filteredResult);
      }, TIMEOUT_LENGTH);
    });
  }

  static getSports() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(sports);
      }, TIMEOUT_LENGTH);
    });
  }

  static getEventGroups(sportId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredResult = _.filter(eventGroups, (item) => {
          return item.sport_id === sportId;
        });
        resolve(filteredResult);
      }, TIMEOUT_LENGTH);
    });
  }

  static getCompetitors(sportId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredResult = _.filter(competitors, (item) => {
          return item.sport_id === sportId;
        });
        resolve(filteredResult);
      }, TIMEOUT_LENGTH);
    });
  }

  static getEvents(sportId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredResult = _.filter(events, (item) => {
          return item.sport_id === sportId;
        });
        resolve(filteredResult);
      }, TIMEOUT_LENGTH);
    });
  }

  static searchEvents(keyword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredResult = _.filter(events, (item) => {
          const team1Name = item.name.split(' vs ')[0];
          const team2Name = item.name.split(' vs ')[1];
          const team1FirstName = team1Name.split(' ')[0];
          const team2FirstName = team2Name.split(' ')[0];
          return team1FirstName.startsWith(keyword) || team2FirstName.startsWith(keyword);
        });
        resolve(filteredResult);
      }, TIMEOUT_LENGTH);
    });
  }

  static getOngoingBets(accountId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredResult = _.filter(bets, (item) => {
          return item.bettor_id === accountId;
        });
        resolve(filteredResult);
      }, TIMEOUT_LENGTH);
    });
  }

  static getResolvedBets(accountId, startTime, stopTime) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: do it later, pending for confirmation from Dan
        resolve([]);
      }, TIMEOUT_LENGTH);
    });
  }


}

export default FakeApi
