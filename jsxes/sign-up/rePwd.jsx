var vaii = require('validator'),
    React = require('react');
module.exports = React.createClass({
    getRefVal: function() {
        return this.props.pack.getRefVal();
    },
    getVal: function() {
        return this.state.value;
    },
    check: function(val, refVal) {
        return vaii.isLength(val, 8, 16) && vaii.equals(val, refVal);
    },
    getInitialState: function() {
        return {
            err: false,
            value: ''
        };
    },
    focus: function(evt) {
        if(this.state.err) {
            this.setState({err: false});
        }
    },
    blur: function(evt) {
        var val = this.state.value,
            refVal = this.getRefVal();
        if(vaii.isLength(refVal, 8, 16) && val && !vaii.equals(val, refVal)) {
            this.setState({err: true});
        }
    },
    change: function(evt) {
        this.setState({value: evt.target.value});
    },
    render: function () {
        var errCN = this.state.err ? 'has-error': '';
        return (
            <div className={'form-group form-group-lg has-feedback ' + errCN}>
                <label className='control-label col-sm-4' htmlFor='re-pwd'>确认密码</label>
                <div className='col-sm-8'>
                    <input className='form-control' type='password' id='re-pwd' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} placeholder='确认密码' />
                    <span className='glyphicon glyphicon-remove form-control-feedback i-icon' aria-hidden='true'></span>
                </div>
                <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请保证两次输入的密码一致</p>
            </div>
        );
    }
});