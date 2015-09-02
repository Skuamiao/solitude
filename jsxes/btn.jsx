var React = require('react');
module.exports = React.createClass({
    render: function () {
        var pack = this.props.pack;
        return (
            <div className='form-group form-group-lg'>
                <div className="col-sm-offset-4 col-sm-8">
                    <input className='btn btn-primary btn-lg' onClick={pack.click} type='submit' value='提交' />
                </div>
            </div>
        );
    }
});