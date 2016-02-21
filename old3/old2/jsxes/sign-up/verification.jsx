var vaii = require('validator'),
    React = require('react');
module.exports = React.createClass({
    getInitialState: function() {
        return {
            value: '',
            status: 0,
            vImg: '/api/verify'
        };
    },
    focus: function(evt) {
        if(this.state.status < 0) {
            this.setState({status: 0});
        }
    },
    blur: function(evt) {
        var val = this.state.value.trim();
        if(val) {
            if(vaii.isNumeric(val) && vaii.isLength(val, 4, 4)) {
                this.setState({status: 1});
            }else {
                this.setState({status: -1});
            }
        }else {
            this.setState({status: 0});
        }
    },
    change: function(evt) {
        this.setState({value: evt.target.value});
    },
    updateImg: function() {
        this.setState({'vImg': '/api/verify?v=' + new Date().getTime()});
    },
    render: function() {
        var errCN = this.state.status < 0 ? 'has-error': '';
        return (
            <div className={'form-group form-group-lg has-feedback ' + errCN}>
                <label className='control-label col-sm-4' htmlFor='verification'>验证码</label>
                <div className="clearfix visible-xs-block"></div>
                <div className='col-sm-8 clearfix'>
                    <input maxLength='4' className='form-control pull-left' type='text' id='verification' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} placeholder='验证码' />
                    <span className='glyphicon glyphicon-remove form-control-feedback i-icon verification-mark' aria-hidden='true'></span>
                    <img onClick={this.updateImg} className='verification pull-right' src={this.state.vImg} />
                </div>
                <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请输入 4 位验证码</p>
            </div>
        );
    }
});
