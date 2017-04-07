import React, {Component} from 'react';
let I18n = require('react-redux-i18n').I18n;
import {
  Input,
  Card
} from 'antd';
import { Field, reduxForm } from 'redux-form/immutable';
import { LoadingStatus } from '../../constants';

//Component to render fields
const renderField = ({ className, errors, placeholder,haswithdrawAmountErr, input, type ,withdrawAmountExceedErrMsg,
    meta: { touched, error } }) => (
  <div>
      <input className={ className } autoComplete='off'  { ...input }
         type={ type } placeholder={ placeholder }/>
       { (touched) && (error || haswithdrawAmountErr) &&
          <span className='errorText'>{haswithdrawAmountErr ? withdrawAmountExceedErrMsg : error}</span> }
      { !error && errors && errors.length ? errors.map((err) => { return <span className='errorText' key={ err }>{ err }</span>}) : null }
  </div>
);

//Allow decimal numbers
const normalizeAmount = (value, previousValue) => {
  if(!value.length) {
    return value;
  }
  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  if(!reg.test(value)) {
    return previousValue && previousValue.toLowerCase();
  }
  return value;
};

class Withdraw extends Component{
  constructor(props){
    super(props);
    this.state = {
      haswithdrawAmountErr: false
    }
    this.onwithdrawAmountChange = this.onwithdrawAmountChange.bind(this);
  }
  //Check entered amount with user's available balance
  onwithdrawAmountChange(e){
    let withdrawAmount = e.target.value;
    if(!isNaN(withdrawAmount)){
      if((parseFloat(withdrawAmount) > 10) || parseFloat(withdrawAmount) === 0){
        this.setState({ haswithdrawAmountErr: true })
      } else {
        this.setState({ haswithdrawAmountErr: false })
      }
    } else {
      this.setState({ haswithdrawAmountErr: false })
    }
  }
  render(){
    const { invalid,asyncValidating,submitting,
            availableBalance,handleSubmit,withdrawLoadingStatus,currencyFormat,withdrawAmount } = this.props,
      isWithdrawLoadingStatusLoading = withdrawLoadingStatus===LoadingStatus.LOADING,
      isWithdrawLoadingStatusDone = withdrawLoadingStatus===LoadingStatus.DONE,
      isDisabled = invalid || submitting || asyncValidating ||
                       this.state.haswithdrawAmountErr || isWithdrawLoadingStatusLoading,
      prefix = currencyFormat === 'BTC' ? 'B' : ( currencyFormat === 'mBTC' ? 'mB' : '');
    let withdrawCardTitle = '';
    if(withdrawLoadingStatus === LoadingStatus.DEFAULT)
      withdrawCardTitle = I18n.t('myAccount.withdraw');
    if(isWithdrawLoadingStatusDone)
      withdrawCardTitle = I18n.t('myAccount.withdraw_completed');
    //TODO: Keeping is pending for now. Will implement when error response is obtained from the action.
    /*if(this.state.haswithdrawAmountErr)
      withdrawCardTitle = I18n.t('myAccount.withdraw_failed');*/
    //TODO: Wallet address validation pending
    return(
      <Card className={ this.props.cardClass } title={ withdrawCardTitle }>
        <div className='my-account'>
          <p>{ I18n.t('myAccount.withdraw_desc') }</p>
          <div className='registerComponent'>
            <Input
              onChange={ this.onAmountChange }
              onBlur={ this.onAmountBlur }
              maxLength='25'
              className='bookie-input bookie-amount'
              defaultValue='21221'
              prefix={ prefix }
              value={ this.state.value }
            />
              <span className='errorText'>
                { this.state.hasAmtFieldErr }
              </span>
          </div>
          <div className='bottom-div'>
            <div
              className='registerComponent pos-relative'>
              <Input
                className='bookie-input'
                placeholder={ I18n.t('myAccount.send_value') }
              />
              <button
                className='btn copy-btn btn-primary'>
                { I18n.t('myAccount.send') }
              </button>
            </div>
          </div>
          { withdrawLoadingStatus !== 'done' ? <p>{ I18n.t('myAccount.withdraw_desc') }</p> : null }
          { !isWithdrawLoadingStatusDone ? <p>{ I18n.t('myAccount.withdraw_desc') }</p> : null }
          { isWithdrawLoadingStatusDone ?
            <div className='registerComponent'>
              <p>
                { I18n.t('myAccount.withdraw_completed_msg_1') + withdrawAmount + prefix + I18n.t('myAccount.withdraw_completed_msg_2') }
              </p>
            </div> :
            <div className='registerComponent'>
              <form onSubmit={ handleSubmit } className='withdrawForm'>
                <div className='form-fields'>
                  <Field name='withdrawAmount' id='withdrawAmount' className='bookie-input bookie-amount'
                    onChange={ this.onwithdrawAmountChange }
                    haswithdrawAmountErr={ this.state.haswithdrawAmountErr }
                    withdrawAmountExceedErrMsg={ I18n.t('myAccount.insuffBitcoinErr') + availableBalance + prefix }
                    component={ renderField }  type='text' normalize={ normalizeAmount } />
                </div>
                <div className='form-fields'>
                  <Field name='walletAddr' id='walletAddr' className='walletAddr-input'
                    component={ renderField } placeholder={ I18n.t('myAccount.send_value') } type='text'/>
                    <button
                      className={ 'btn ' + (isDisabled ? 'copy-btn-disabled':' copy-btn') + ' btn-primary' }
                      type='submit'
                      disabled={ isDisabled }>
                      { isWithdrawLoadingStatusLoading  ? I18n.t('application.loading') : I18n.t('myAccount.send') }
                    </button>
                </div>
              </form>
            </div>
          }
        </div>
      </Card>
    )
  }
}
export default reduxForm({
  form: 'withdrawForm',  // a unique identifier for this form
  fields: ['withdrawAmount', 'walletAddr'],
  //Form field validations
  validate: function submit(values) {
    let errors = {};
    if (!values.get('withdrawAmount')) {
      errors.withdrawAmount = I18n.t('myAccount.enter_withdrawAmount')
    }
    if (!values.get('walletAddr')) {
      errors.walletAddr = I18n.t('myAccount.enter_wallet_addr')
    }
    return errors;
  }
})(Withdraw)
