var vaii = require('validator'),
    React = require('react');
module.exports = React.createClass({
    getRefInfo: function() {
        return this.props.pack.getRefInfo();
    },
    getInitialState: function() {
        return {
            value: '',
            status: 0
        };
    },
    focus: function(evt) {
        if(this.state.status < 0) {
            this.setState({status: 0});
        }
    },
    blur: function(evt) {
        var val = this.state.value,
            ref = this.getRefInfo();

        if(val && ref.status > 0) {
            if(vaii.equals(val, ref.value)) {
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
    render: function () {
        var errCN = this.state.status < 0 ? 'has-error': '';
        return (
            <div className={'form-group form-group-lg has-feedback ' + errCN}>
                <label className='control-label col-sm-4' htmlFor='re-pwd'>确认密码</label>
                <div className='col-sm-8'>
                    <input maxLength='16' className='form-control' type='password' id='re-pwd' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} placeholder='确认密码' />
                    <span className='glyphicon glyphicon-remove form-control-feedback i-icon' aria-hidden='true'></span>
                </div>
                <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请保证两次输入的密码一致</p>
            </div>
        );
    }
});