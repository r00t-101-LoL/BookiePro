import React, { PureComponent } from 'react';
import { EventNameUtils, DateUtils } from '../../utility';
import './Event.less';

class Event extends PureComponent {
  render() {
    const { id, onClick, data, name } = this.props;

    let date = DateUtils.getMonthAndDay(data.start_time);
    return (
      <div>
        { data.start_time && <label className='event-date-header'>{ date }</label> }

        <div className='event-node-container' key={ id } onClick={ onClick  }>
          <div className={ `event-label-container${data.isSelected ? '-selected' : ''}` }>
            <label>{ EventNameUtils.breakAtVs(name) }</label>
          </div>
        </div>
      </div>

    );
  }
}

export default Event;
