import { ActionTypes, LoadingStatus } from '../constants';
import { BlockchainUtils } from '../utility';
import { WalletService, AccountService, KeyGeneratorService, CommunicationService } from '../services';
import { TransactionBuilder } from 'graphenejs-lib';
import NavigateActions from './NavigateActions';
import AssetActions from './AssetActions';
import SettingActions from './SettingActions';
import AppActions from './AppActions';
import log from 'loglevel';
import Immutable from 'immutable';
import { I18n } from 'react-redux-i18n';
import _ from 'lodash';

/**
 * Private actions
 */
class AccountPrivateActions {

  static setGetTransactionHistoryLoadingStatusAction(loadingStatus) {
    return {
      type: ActionTypes.ACCOUNT_SET_GET_TRANSACTION_HISTORIES_LOADING_STATUS,
      loadingStatus
    }
  }

  static setGetTransactionHistoriesExportLoadingStatusAction(loadingStatus) {
    return {
      type: ActionTypes.ACCOUNT_SET_GET_TRANSACTION_HISTORIES_LOADING_STATUS_EXPORT,
      loadingStatus
    }
  }

  static setGetDepositAddressLoadingStatusAction(loadingStatus) {
    return {
      type: ActionTypes.ACCOUNT_SET_GET_DEPOSIT_ADDRESS_LOADING_STATUS,
      loadingStatus
    }
  }

  static setWithdrawLoadingStatusAction(loadingStatus) {
    return {
      type: ActionTypes.ACCOUNT_SET_WITHDRAW_LOADING_STATUS,
      loadingStatus
    }
  }

  static setChangePasswordLoadingStatusAction(loadingStatus) {
    return {
      type: ActionTypes.ACCOUNT_SET_CHANGE_PASSWORD_LOADING_STATUS,
      loadingStatus
    }
  }

  static setChangePasswordErrorsAction(errors) {
    return {
      type: ActionTypes.ACCOUNT_SET_CHANGE_PASSWORD_ERRORS,
      errors
    }
  }

  static setGetBalanceLoadingStatusAction(loadingStatus) {
    return {
      type: ActionTypes.ACCOUNT_SET_GET_BALANCE_LOADING_STATUS,
      loadingStatus
    }
  }

  static setTransactionHistoriesAction(transactionHistories) {
    return {
      type: ActionTypes.ACCOUNT_SET_TRANSACTION_HISTORIES,
      transactionHistories
    }
  }


  static setGetTransactionHistoryErrorAction(error) {
    return {
      type: ActionTypes.ACCOUNT_SET_GET_TRANSACTION_HISTORIES_ERROR,
      error
    }
  }

  static setTransactionHistoriesExportAction(transactionHistoriesExport) {
    return {
      type: ActionTypes.ACCOUNT_SET_TRANSACTION_HISTORIES_EXPORT,
      transactionHistoriesExport
    }
  }

  static setGetTransactionHistoriesExportErrorAction(error) {
    return {
      type: ActionTypes.ACCOUNT_SET_GET_TRANSACTION_HISTORIES_ERROR_EXPORT,
      error
    }
  }

  static setWithdrawErrorAction(error) {
    return {
      type: ActionTypes.ACCOUNT_SET_WITHDRAW_ERROR,
      error
    }
  }


  static setGetDepositAddressErrorAction(error) {
    return {
      type: ActionTypes.ACCOUNT_SET_GET_DEPOSIT_ADDRESS_ERROR,
      error
    }
  }

  static setDepositAddressAction(depositAddress) {
    return {
      type: ActionTypes.ACCOUNT_SET_DEPOSIT_ADDRESS,
      depositAddress
    }
  }

  static logoutAction() {
    return {
      type: ActionTypes.ACCOUNT_LOGOUT
    }
  }

  static setKeysAction(privateKeyWifsByRole, publicKeyStringsByRole) {
    return {
      type: ActionTypes.ACCOUNT_SET_KEYS,
      privateKeyWifsByRole,
      publicKeyStringsByRole
    }
  }


  static addOrUpdateAvailableBalancesAction(availableBalances) {
    return {
      type: ActionTypes.ACCOUNT_ADD_OR_UPDATE_AVAILABLE_BALANCES,
      availableBalances,
    }
  }

}

/**
 * Public actions
 */
class AccountActions {

  static removeAvailableBalanceByIdAction(balanceId) {
    return {
      type: ActionTypes.ACCOUNT_REMOVE_AVAILABLE_BALANCE_BY_ID,
      balanceId,
    }
  }

  static resetChangePwdLoadingStatus(){
    return AccountPrivateActions.setChangePasswordLoadingStatusAction(LoadingStatus.DEFAULT);
  }

  static addOrUpdateAvailableBalances(availableBalances) {
    return (dispatch, getState) => {
      const assetIds = availableBalances.map( balance => balance.get('asset_type'));
      // Get asset objects for each balance
      dispatch(AssetActions.getAssetsByIds(assetIds)).then((assets) => {
        // Save available balances
        dispatch(AccountPrivateActions.addOrUpdateAvailableBalancesAction(availableBalances));
        log.debug('Add available balances succeeds.');
      }).catch((error) => {
        log.error('Fail to add or update available balances', error);
      })
    }
  }


  static setInGameBalancesAction(inGameBalances) {
    return {
      type: ActionTypes.ACCOUNT_SET_IN_GAME_BALANCES,
      inGameBalances
    }
  }

  static setStatisticsAction(statistics) {
    return {
      type: ActionTypes.ACCOUNT_SET_STATISTICS,
      statistics
    }
  }

  static setAccountAction(account) {
    return {
      type: ActionTypes.ACCOUNT_SET_ACCOUNT,
      account
    }
  }

  static setPassword(password) {
    return {
      type: ActionTypes.ACCOUNT_SET_PASSWORD,
      password
    }
  }

  /**
   * Set keys for the account
   */
  static setKeys(keys) {
    return (dispatch) => {
      log.debug('Set account\'s keys');
      let privateKeyWifsByRole = Immutable.Map();
      let publicKeyStringsByRole = Immutable.Map();
      _.forEach(keys, (privateKey, role) => {
        privateKeyWifsByRole = privateKeyWifsByRole.set(role, privateKey.toWif());
        publicKeyStringsByRole = publicKeyStringsByRole.set(role, privateKey.toPublicKey().toPublicKeyString());
      });
      dispatch(AccountPrivateActions.setKeysAction(privateKeyWifsByRole, publicKeyStringsByRole));
    }
  }

  /**
   * Get transaction history
   */
  static getTransactionHistory(startTime, stopTime) {
    return (dispatch, getState) => {
      const accountId = getState().getIn(['account', 'account', 'id']);

      dispatch(AccountPrivateActions.setGetTransactionHistoryLoadingStatusAction(LoadingStatus.LOADING));
      CommunicationService.getTransactionHistoryGivenTimeRange(accountId, startTime, stopTime).then((transactionHistories) => {
        log.debug('Get transaction histories succeed.');
        dispatch(AccountPrivateActions.setTransactionHistoriesAction(transactionHistories));
        dispatch(AccountPrivateActions.setGetTransactionHistoryLoadingStatusAction(LoadingStatus.DONE));
      }).catch((error) => {
        log.error('Get transaction histories error', error);
        //Set password change error
        dispatch(AccountPrivateActions.setGetTransactionHistoryErrorAction(error));
      });
    };
  }

  /**
   * Get transaction history for Export
   */
  static getTransactionHistoriesExport(startTime, stopTime) {
    return (dispatch, getState) => {
      const accountId = getState().getIn(['account', 'account', 'id']);

      dispatch(AccountPrivateActions.setGetTransactionHistoriesExportLoadingStatusAction(LoadingStatus.LOADING));
      //Included a 3 second timeout now, just to test the various states of export
      setTimeout(function(){
        CommunicationService.getTransactionHistoryGivenTimeRange(accountId, startTime, stopTime).then((transactionHistoriesExport) => {
          if(getState().getIn(['account', 'getTransactionHistoriesExportLoadingStatus'])===LoadingStatus.DEFAULT)
            return;
          log.debug('Get transaction histories succeed.');
          dispatch(AccountPrivateActions.setTransactionHistoriesExportAction(transactionHistoriesExport));
          dispatch(AccountPrivateActions.setGetTransactionHistoriesExportLoadingStatusAction(LoadingStatus.DONE));
        }).catch((error) => {
          log.error('Get transaction histories error', error);
          //Set password change error
          dispatch(AccountPrivateActions.setGetTransactionHistoriesExportErrorAction(error));
        });
      }, 3000);
    };
  }

  //Reset transaction history export status to default when the export is cancelled
  static resetTransactionHistoryExportLoadingStatus(){
    return AccountPrivateActions.setGetTransactionHistoriesExportLoadingStatusAction(LoadingStatus.DEFAULT);
  }

  //Clear transaction history export data after download to clean up memory
  static clearTransactionHistoryExport(){
    return AccountPrivateActions.setTransactionHistoriesExportAction();
  }

  static getDepositAddress() {
    return (dispatch, getState) => {
      const accountId = getState().getIn(['account', 'account', 'id']);

      dispatch(AccountPrivateActions.setGetDepositAddressLoadingStatusAction(LoadingStatus.LOADING));
      CommunicationService.getDepositAddress(accountId).then((depositAddress) => {
        log.debug('Get deposit address succeed.');
        dispatch(AccountPrivateActions.setDepositAddressAction(depositAddress));
        dispatch(AccountPrivateActions.setGetDepositAddressLoadingStatusAction(LoadingStatus.DONE));
      }).catch((error) => {
        log.error('Get deposit address error', error);
        //Set password change error
        dispatch(AccountPrivateActions.setGetDepositAddressErrorAction(error));
      });
    };
  }

  static withdraw(withdrawAmt,walletAddress) {
    return (dispatch) => {
      dispatch(AccountPrivateActions.setWithdrawLoadingStatusAction(LoadingStatus.LOADING));
      CommunicationService.withdraw(walletAddress).then(() => {
        log.debug('Withdraw succeed.');
        dispatch(AccountPrivateActions.setWithdrawLoadingStatusAction(LoadingStatus.DONE));
      }).catch((error) => {
        log.error('Withdraw error', error);
        //Set password change error
        dispatch(AccountPrivateActions.setWithdrawErrorAction(error));
      });
    };
  }

  static changePassword(oldPassword, newPassword) {
    return (dispatch, getState) => {
      dispatch(AccountPrivateActions.setChangePasswordLoadingStatusAction(LoadingStatus.LOADING));

      const account = getState().getIn(['account', 'account']);
      const oldKeys = KeyGeneratorService.generateKeys(account.get('name'), oldPassword);
      // Generate new public key
      const newKeys = KeyGeneratorService.generateKeys(account.get('name'), newPassword);
      const newOwnerPublicKey = newKeys.owner.toPublicKey().toPublicKeyString();
      const newActivePublicKey = newKeys.active.toPublicKey().toPublicKeyString();
      const newMemoPublicKey = newKeys.memo.toPublicKey().toPublicKeyString();

      Promise.resolve().then(() => {
        // Check if account is authenticated
        const isAuthenticated = AccountService.authenticateAccount(account, oldKeys);
        if (!isAuthenticated) {
          throw new Error(I18n.t('changePassword.old_password_does_not_match'));
        }
        // Create transaction and add operation
        const tr = new TransactionBuilder();
        const operationParams = {
          fee: {
            amount: 0,
            asset_id: '1.3.0'
          },
          account: account.get('id'),
          owner: Object.assign({}, account.get('owner').toJS(), {key_auths: [[newOwnerPublicKey, 1]]}),
          active:  Object.assign({}, account.get('active').toJS(), {key_auths: [[newActivePublicKey, 1]]}),
          new_options: Object.assign({}, account.get('options').toJS(), {memo_key: newMemoPublicKey})
        };
        tr.add_type_operation('account_update', operationParams);
        // Process transaction
        return WalletService.processTransaction(getState(), tr);
      }).then(() => {
        log.debug('Change Password succeed.');
        // Set new password
        dispatch(AccountActions.setPassword(newPassword));
        // Set keys
        dispatch(AccountActions.setKeys(newKeys));
        //To display the success message
        dispatch(AccountPrivateActions.setChangePasswordLoadingStatusAction(LoadingStatus.DONE));
      }).catch((error) => {
        log.error('Change Password error', error);
        //Set password change error
        dispatch(AccountPrivateActions.setChangePasswordErrorsAction([error.message ? error.message : 'Error Occured']));
      });
    };
  }

  // TODO: The following this are used for testing only, remove later
  static createLimitOrder() {
    return (dispatch, getState) => {
      const sellAssetId = '1.3.0';
      const buyAssetId = '1.3.1';
      const sellAmount = 0.001;
      const buyAmount = 0.001;
      CommunicationService.callBlockchainDbApi('get_objects',[[sellAssetId, buyAssetId]]).then((result) => {
        console.log('result', result)
        const sellAsset = Immutable.fromJS(result[0]); // Core token
        const buyAsset = Immutable.fromJS(result[1]);
        const sellAssetAmount = sellAmount;
        const buyAssetAmount = buyAmount;
        const accountId = getState().getIn(['account', 'account', 'id']);
        const sellAssetSatoshiAmount = BlockchainUtils.get_satoshi_amount(sellAssetAmount, sellAsset);
        const buyAssetSatoshiAmount = BlockchainUtils.get_satoshi_amount(buyAssetAmount, buyAsset);
        const expiration = new Date();
        expiration.setYear(expiration.getFullYear() + 5);
        const isFillOrKill = false;

        // Create transaction and add operation
        const tr = new TransactionBuilder();
        const operationParams1 = {
          'seller': accountId,
          'amount_to_sell': {
            'amount': sellAssetSatoshiAmount,
            'asset_id': sellAssetId
          },
          expiration : expiration,
          'min_to_receive': {
            'amount': buyAssetSatoshiAmount,
            'asset_id': buyAssetId
          },
          'fill_or_kill': isFillOrKill
        };
        const operationParams2 = {
          'seller': accountId,
          'amount_to_sell': {
            'amount': sellAssetSatoshiAmount,
            'asset_id': sellAssetId
          },
          expiration : expiration,
          'min_to_receive': {
            'amount': buyAssetSatoshiAmount*2,
            'asset_id': buyAssetId
          },
          'fill_or_kill': isFillOrKill
        };
        const operationParams3 = {
          'seller': accountId,
          'amount_to_sell': {
            'amount': sellAssetSatoshiAmount,
            'asset_id': sellAssetId
          },
          expiration : expiration,
          'min_to_receive': {
            'amount': buyAssetSatoshiAmount*3,
            'asset_id': buyAssetId
          },
          'fill_or_kill': isFillOrKill
        };
        tr.add_type_operation('limit_order_create', operationParams1);
        tr.add_type_operation('limit_order_create', operationParams2);
        tr.add_type_operation('limit_order_create', operationParams3);
        console.log(tr)
        // Process transaction
        return WalletService.processTransaction(getState(), tr);
      }).then(() => {
        console.log('Create limit order success');
      }).catch((error) => {
        console.error('Create limit order fails', error);
      })
    }
  }

  /**
   * Logout the user, show popup dialog if needed
   */
  static logoutAndShowPopupIfNeeded() {
    return (dispatch, getState) => {
      const accountId = getState().getIn(['account', 'account', 'id']);
      if (accountId) {
        const isSkipLogoutPopup = getState().getIn(['setting', 'settingByAccountId', accountId, 'isSkipLogoutPopup']);
        if (isSkipLogoutPopup) {
          // Skip logout popup, directly confirm logout
          dispatch(AccountActions.confirmLogout(isSkipLogoutPopup));
        } else {
          // Show logout popup
          dispatch(AppActions.showLogoutPopupAction(true))
        }
      } else {
        log.error('No user is logged in');
      }
    }
  }

  /**
   * Confirm logging out the user (use this to confirm logout for the logout popup modal)
   */
  static confirmLogout(skipLogoutPopupNextTime) {
    return (dispatch, getState) => {
      // Mark skip logout popup
      const accountId = getState().getIn(['account', 'account', 'id']);
      if (accountId) {
        // Close popup
        dispatch(AppActions.showLogoutPopupAction(false))
        // Save in redux
        dispatch(SettingActions.markSkipLogoutPopupAction(accountId, skipLogoutPopupNextTime));
        // Dispatch logout action to clear data
        dispatch(AccountPrivateActions.logoutAction());
        // Navigate to the login page of the app
        dispatch(NavigateActions.navigateTo('/login'));
        log.debug('Logout user succeed.');
      } else {
        log.error('No user is logged in');
      }
    }
  }



}

export default AccountActions;
