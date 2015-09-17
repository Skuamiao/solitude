var vaii = require('validator'),
    React = require('react');
module.exports = React.createClass({
    getVal: function() {
        return this.state.value.trim();
    },
    check: function(val) {
        return vaii.isNumeric(val) && vaii.isLength(val, 4, 4);
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
        var val = this.state.value.trim();
        if(val && !(vaii.isNumeric(val) && vaii.isLength(val, 4, 4))) {
            this.setState({err: true});
        }
    },
    change: function(evt) {
        this.setState({value: evt.target.value});
    },
    click: function() {
        var img = this.refs.verificationImg.getDOMNode();
        img.setAttribute('src', img.getAttribute('src') + "?v=" + new Date().getTime());
    },
    render: function() {
        var errCN = this.state.err ? 'has-error': '';
        return (
            <div className={'form-group form-group-lg has-feedback ' + errCN}>
                <label className='control-label col-sm-4' htmlFor='verification'>验证码</label>
                <div className='col-xs-8 col-sm-5'>
                    <input className='form-control' type='text' id='verification' onFocus={this.focus} onBlur={this.blur} onChange={this.change} value={this.state.value} placeholder='验证码' />
                    <span className='glyphicon glyphicon-remove form-control-feedback i-icon' aria-hidden='true'></span>
                </div>
                <img ref='verificationImg' onClick={this.click} className='verification col-xs-4 col-sm-3' src='/api/verify' />
                <p className='col-xs-12 col-sm-offset-4 col-sm-8 i-tip text-danger'>请输入 4 位验证码</p>
            </div>
        );
    }
});
