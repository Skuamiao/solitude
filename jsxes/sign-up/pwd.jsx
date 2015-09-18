var vaii = require('validator'),
    React = require('react');
module.exports = React.createClass({
    getVal: function() {
        return this.state.value;
    },
    check: function(val) {
        return vaii.isLength(val, 8, 16);
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
        var val = this.state.value;
        if(val && !vaii.isLength(val, 8, 16)) {
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
                <label className='control-label col-sm-4' htmlFor='pwd'>密码</label>
                <div className='col-sm-8'>
                    <input maxLength='16' className='form-control' type='password' id='pwd' placeholder='8 - 16 位密码' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} />
                    <span className='glyphicon glyphicon-remove form-control-feedback i-icon' aria-hidden='true'></span>
                </div>
                <p className='col-sm-offset-4 col-sm-8 i-tip text-danger'>请输入 8 - 16 位密码</p>
            </div>
        );
    }
});