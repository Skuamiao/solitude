var React = require('react');
module.exports = React.createClass({
    getVal: function() {
        return this.state.value.trim();
    },
    getInitialState: function() {
        return {
            value: ''
        };
    },
    change: function(evt) {
        this.setState({value: evt.target.value});
    },
    render: function() {
        return (
            <div className='form-group form-group-lg nickname-row'>
                <label className='control-label col-sm-4' htmlFor='nick-name'>昵称</label>
                <div className='col-sm-8'>
                    <input maxLength='12' className='form-control' type='text' id='nick-name' placeholder='昵称或留空' onChange={this.change} value={this.state.value} />
                </div>
            </div>
        );
    }
});