var vaii = require('validator'),
    React = require('react');
module.exports = React.createClass({
        getVal: function() {
            return this.state.value.trim();
        },
        check: function(val) {
            return vaii.isEmail(val);
        },
        getInitialState: function() {
            return  {
                value: '',
                err: false
            }
        },
        focus: function(evt) {
            if(this.state.err) {
                this.setState({err: false});
            }
        },
        blur: function(evt) {
            var val = this.state.value.trim();
            if(val && !vaii.isEmail(val)) {
                this.setState({err: true});
            }
        },
        change: function(evt) {
            this.setState({value: evt.target.value});
        },
        render: function() {
            var errCN = this.state.err ? 'has-error': '';
            return (
                <div className={'form-group form-group-lg has-feedback ' + errCN}>
                    <label className='control-label col-sm-4' htmlFor='email'>Email</label>
                    <div className='col-sm-8'>
                        <input maxLength='28' className='form-control' type='email' id='email' placeholder='如 a@bc.de' onChange={this.change} onFocus={this.focus} onBlur={this.blur} value={this.state.value} />
                        <span className="glyphicon glyphicon-remove form-control-feedback i-icon" aria-hidden="true"></span>
                    </div>
                    <p className='col-sm-offset-4 col-sm-8 text-danger i-tip'>
                        请输入正确的邮箱
                    </p>
                </div>
            );
        }
    });
