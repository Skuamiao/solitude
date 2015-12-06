var React = require('react');
module.exports = React.createClass({
    getInitialState: function() {
        return  {
            value: '注册',
            signUping: 0
        }
    },
    setSignUpingVal: function() {
        this.setState({value: '注册中...'});
    },
    setDefaultVal: function() {
        this.setState({value: '注册'});
    },
    render: function () {
        var pack = this.props.pack;
        return (
            <div className='form-group form-group-lg'>
                <div className="col-sm-offset-4 col-sm-8">
                    <input className='btn btn-primary btn-lg btn-block' onClick={pack.click} type='submit' value={this.state.value} />
                </div>
            </div>
        );
    }
});
