import { ActionTypes, Config, ChainTypes } from '../constants';
import { CommunicationService } from '../services';
import { SoftwareUpdateUtils } from '../utility';
import { StringUtils } from '../utility';
import log from 'loglevel';
import NotificationActions from './NotificationActions';
import AppActions from './AppActions';

class SoftwareUpdatePrivateActions {
  static setUpdateParameter(version, displayText) {
    return {
      type: ActionTypes.SOFTWARE_UPDATE_SET_UPDATE_PARAMETER,
      version,
      displayText
    }
  }
  static setReferenceAccountStatisticsAction(referenceAccountStatistics) {
    return {
      type: ActionTypes.SOFTWARE_UPDATE_SET_REFERENCE_ACCOUNT_STATISTICS,
      referenceAccountStatistics
    }
  }

  static setReferenceAccountAction(referenceAccount) {
    return {
      type: ActionTypes.SOFTWARE_UPDATE_SET_REFERENCE_ACCOUNT,
      referenceAccount
    }
  }

}

/**
 * Public actions
 */
class SoftwareUpdateActions {

  static setReferenceAccountStatistics(referenceAccountStatistics) {
    return (dispatch, getState) => {
      // Check if this account made new transaction, if that's the case check for software update
      const currentMostRecentOp = getState().getIn(['softwareUpdate', 'referenceAccountStatistics', 'most_recent_op']);
      const updatedMostRecentOp = referenceAccountStatistics.get('most_recent_op')
      const hasMadeNewTransaction = currentMostRecentOp && (updatedMostRecentOp !== currentMostRecentOp);
      if (hasMadeNewTransaction) {
        dispatch(SoftwareUpdateActions.checkForSoftwareUpdate());
      }
      // Set the newest statistic
      dispatch(SoftwareUpdatePrivateActions.setReferenceAccountStatisticsAction(referenceAccountStatistics));
    }
  }

  /**
   * Check for software update
   */
  static checkForSoftwareUpdate(attempt=3) {
    return (dispatch, getState) => {
      const referenceAccountId = getState().getIn(['softwareUpdate', 'referenceAccount', 'id']);
      if (!referenceAccountId) {
        // Reference account not set yet
        return dispatch(SoftwareUpdateActions.listenToSoftwareUpdate());
      } else {
        // Get latest 100 transaction history and parse it
        return CommunicationService.fetchRecentHistory(referenceAccountId, null, 100).then((history) => {
          history.forEach((transaction) => {
            const operationType = transaction.getIn(['op', 0]);
            // 0 is operation type for transfer
            if (operationType === ChainTypes.operations.transfer) {
              // Check memo
              const memoMessage = transaction.getIn(['op', 1, 'memo', 'message']);
              if (memoMessage) {
                // Assuming that we dun need to decrypt the message to parse 'software update' memo message
                let memoJson, version, displayText;
                try {
                  memoJson = JSON.parse(StringUtils.hex2a(memoMessage));
                  version = memoJson.version;
                  displayText = memoJson.displayText;
                } catch (error) {
                  log.warn('Invalid memo, most likely this is not software update transaction');
                }

                // If it has valid version then it is an update transaction
                if (version && SoftwareUpdateUtils.isValidVersionNumber(version)) {
                  // Set update parameter
                  dispatch(SoftwareUpdatePrivateActions.setUpdateParameter(version, displayText));
                  const isNeedHardUpdate = SoftwareUpdateUtils.isNeedHardUpdate(version);
                  const isNeedSoftUpdate = SoftwareUpdateUtils.isNeedSoftUpdate(version);
                  // Show software update popup if needed
                  if (isNeedHardUpdate || isNeedSoftUpdate) {
                    dispatch(AppActions.showSoftwareUpdatePopupAction(true));
                  }
                  // Add notification if it is soft update
                  if (isNeedSoftUpdate) {
                    dispatch(NotificationActions.addSoftUpdateNotification(version));
                  }
                  log.trace('Check for software update succeed');
                  // Terminate early
                  return false;
                }

              }
            }
          });
        }).catch((error) => {
          // Retry
          if (attempt > 0) {
            log.warn('Retry checking for software update', error);
            return dispatch(SoftwareUpdateActions.checkForSoftwareUpdate(attempt-1));
          } else {
            // Log the error and give up
            log.error('Fail to check for software update', error);
          }
        });
      }

    }
  }

  /**
   * Listen to software update (fetch info from software update reference account)
   */
  static listenToSoftwareUpdate(attempt=3) {
    return (dispatch) => {
      const accountName = Config.softwareUpdateReferenceAccountName;
      // Fetch reference account in async manner
      return CommunicationService.getFullAccount(accountName).then( (fullAccount) => {
        if (fullAccount) {
          const account = fullAccount.get('account');
          const statistics = fullAccount.get('statistics');
          dispatch(SoftwareUpdatePrivateActions.setReferenceAccountAction(account));
          dispatch(SoftwareUpdateActions.setReferenceAccountStatistics(statistics));
          log.debug('Listen to software update succeed.')
          // Check for software update
          return dispatch(SoftwareUpdateActions.checkForSoftwareUpdate());
        }
      }).catch((error) => {
        // Retry
        if (attempt > 0) {
          log.warn('Retry listening to software update', error);
          return dispatch(SoftwareUpdateActions.listenToSoftwareUpdate(attempt-1));
        } else {
          log.error('Fail to listen to software update', error);
          // Throw error
          throw error;
        }
      });
    }
  }
}
export default SoftwareUpdateActions;
