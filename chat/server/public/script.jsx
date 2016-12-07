"use strict";

/**
 * Created by aviklar10 on 03/12/2016.
 */

var endpoint = 'http://localhost:8080/';

var Form = React.createClass({
    displayName: "Form",

    handleSubmit() {
    },
    render: function render() {
        return React.createElement(
            "form",
            {onSubmit: this.handleSubmit},
            React.createElement("input", {placeholder: "Type a message", ref: "login"}),
            React.createElement(
                "button",
                null,
                "Send"
            )
        );
    }
});

var Main = React.createClass({
    displayName: "Main",

    getInitialState: function getInitialState() {
        return {data: null}
    },

    componentDidMount: function componentDidMount() {
        var that = this;

        $.getJSON(endpoint, function (data) {
            that.setState({myId: data.myId, lastId: data.lastId});

        });
        setInterval(that.pollServerForNewMessages, 2500);

    },

    pollServerForNewMessages() {
        var that = this;
        if (that.state.lastId) {
            $.getJSON({
                type: 'POST',
                url: endpoint + 'fetchlastmsg',
                dataType: 'json',
                cache: false,
                data: {id: this.state.lastId},
                success: function (messages) {
                    that.setState({messages})

                    console.info(that.state.messages)
                },
                error: function (xhr, status, err) {
                    console.error(endpoint + 'fetchlastmsg', status, err.toString());
                }


            })
        }

    },
    getMessages() {
        var messages = this.state.messages;
        var markup = [];
        if (messages) {
            for (var index in messages) {
                markup.push(<div>{messages[index]}</div>)
            }
        }
        return markup;
    },

    getMyId() {
        var markup = null;

        if (this.state.myId) {
            markup = (<div>Welcome user #{this.state.myId}</div>);
        }

        return markup;
    },

    onMessageSubmit() {
        console.log(this.refs.myInput.value);
        var that = this;
        if (that.state.myId) {
            $.getJSON({
                type: 'POST',
                url: endpoint + this.state.myId + '/sendmsg',
                dataType: 'json',
                cache: false,
                data: {mymsg: that.refs.myInput.value},
                success: function () {
                    that.pollServerForNewMessages
                    console.info(that.state.response)
                    that.refs.myInput.value='';
                },
                error: function (xhr, status, err) {
                    console.error(endpoint + 'fetchlastmsg', status, err.toString());
                    that.refs.myInput.value='';
                },

            })
        }
    },

    getInput() {
        return (
            <div>
                <input type="text" placeholder="please enter message" ref="myInput" size="70"></input>
                <button type="submit" onClick={this.onMessageSubmit} >send</button>
            </div>
        );
    },

    render: function render() {
        return (
            <div>
                <div>
                    {<h3>{this.getMyId()}</h3>}
                    {this.getMessages()}

                </div>
                {this.getInput()}
            </div>
        );
    }
});


ReactDOM.render(React.createElement(Main, null), document.getElementById("root"));