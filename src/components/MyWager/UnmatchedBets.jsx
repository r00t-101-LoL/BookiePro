/**
 * Unmatchedbets to list Unmatched bets. sum of back bet’s stack + sum of lay bet’s liability displayed at top.
 * 'Cancel All' button to cancel all bets at top right side
 * bets displayed in chronological order, nearest to oldest, 20 records per screen, with pagination at the bottom of the screen.
 * eventname clickable which will redirect to event full market screen. user can edit unmatched bet via the market drawer.
 * cancel button next to every bet record - cancel relevant
 * Unmatchedbets is child to Mywager
 * Unmatchedbets used in mybets tabbed list
 */
import React, { PureComponent } from 'react';
import { Table, Modal } from 'antd';
import { LoadingStatus } from '../../constants';
import { MyWagerUtils, CurrencyUtils } from '../../utility';
import { I18n } from 'react-redux-i18n';
import { List } from 'immutable';
import './MyWager.less';
import _ from 'lodash';
import PropTypes from 'prop-types';

class UnmatchedBets extends PureComponent {

  constructor(props) {
    super(props);

    const { unmatchedBets, currencyFormat, onCancelBetClick, onEventClick } = props;

    this.state = {
      tableData: unmatchedBets.toJS(),
      columns: MyWagerUtils.getUnmatchedBetsColumns(currencyFormat, onCancelBetClick, onEventClick)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.unmatchedBets !== nextProps.unmatchedBets) {
      this.setState({
        tableData: nextProps.unmatchedBets.toJS()
      })
    }
    if (this.props.currencyFormat !== nextProps.currencyFormat ||
        this.props.onCancelBetClick !== nextProps.onCancelBetClick ||
        this.props.onEventClick !== nextProps.onEventClick) {
      this.setState({
        columns: MyWagerUtils.getUnmatchedBetsColumns(nextProps.currencyFormat, nextProps.onCancelBetClick, nextProps.onEventClick)
      })
    }
  }

  render() {
    const { unmatchedBetsLoadingStatus, currencyFormat, betsTotal, onCancelAllBetsClick,
      isCancelAllConfirmModalVisible, handleCancelAllBets, declineCancelAllBets } = this.props;
    const currencySymbol = CurrencyUtils.getCurruencySymbol(currencyFormat);
    return (
      <div className='table-card'>
        <div className='filterComponent clearfix'>
          <div className='float-left'>
            <p className='card-title'>{ I18n.t('mybets.total') } : <span>{ currencySymbol + (betsTotal ? betsTotal : 0) }</span> </p>
          </div>
          { this.state.tableData.length !== 0 ?
          <div className='float-right'>
            <button className='btn cancel-btn' onClick={ onCancelAllBetsClick }
              disabled={ this.state.tableData && this.state.tableData.length === 0 }>{ I18n.t('mybets.cancel_all') }</button>
          </div>
          : null }
        </div>
        <Table className='bookie-table' pagination={ { pageSize: 20 } } rowKey='id'
          locale={ {emptyText: ( this.state.tableData.length === 0 &&
            unmatchedBetsLoadingStatus === LoadingStatus.DONE ? I18n.t('mybets.nodata') : unmatchedBetsLoadingStatus )} }
          dataSource={ this.state.tableData } columns={ this.state.columns } >
        </Table>
        <Modal
          wrapClassName={ 'vertical-center-modal' }
          title={ I18n.t('mybets.cancel_all_confirm', {currencySymbol, betsTotal}) }
          visible={ isCancelAllConfirmModalVisible }
          onOk={ handleCancelAllBets }
          onCancel={ declineCancelAllBets }
          okText='Confirm'
          cancelText='Cancel'>
        </Modal>
      </div>
    )
  }
}

UnmatchedBets.propTypes = {
  unmatchedBets: PropTypes.instanceOf(List).isRequired
}
export default UnmatchedBets;
