"use strict";

/**
 * Created by aviklar10 on 03/12/2016.
 */

var endpoint = 'http://localhost:8080/';

var Form = React.createClass({
    displayName: "Form",

    handleSubmit: function handleSubmit() {},

    render: function render() {
        return React.createElement("form", { onSubmit: this.handleSubmit }, React.createElement("input", { placeholder: "Type a message", ref: "login" }), React.createElement("button", null, "Send"));
    }
});

var Main = React.createClass({
    displayName: "Main",

    getInitialState: function getInitialState() {
        return { data: null };
    },

    componentDidMount: function componentDidMount() {
        var that = this;

        $.getJSON(endpoint, function (data) {
            that.setState({ myId: data.myId, lastId: data.lastId });
        });
        setInterval(that.pollServerForNewMessages, 2500);
    },

    pollServerForNewMessages: function pollServerForNewMessages() {
        var that = this;
        if (that.state.lastId) {
            $.getJSON({
                type: 'POST',
                url: endpoint + 'fetchlastmsg',
                dataType: 'json',
                cache: false,
                data: { id: this.state.lastId },
                success: function success(messages) {
                    that.setState({ messages: messages });

                    console.info(that.state.messages);
                },
                error: function error(xhr, status, err) {
                    console.error(endpoint + 'fetchlastmsg', status, err.toString());
                }

            });
        }
    },
    getMessages: function getMessages() {
        var messages = this.state.messages;
        var markup = [];
        if (messages) {
            for (var index in messages) {
                markup.push(React.createElement(
                    "div",
                    null,
                    messages[index]
                ));
            }
        }
        return markup;
    },
    getMyId: function getMyId() {
        var markup = null;

        if (this.state.myId) {
            markup = React.createElement(
                "div",
                null,
                "Welcome user #",
                this.state.myId
            );
        }

        return markup;
    },
    onMessageSubmit: function onMessageSubmit() {
        console.log(this.refs.myInput.value);
        var that = this;
        if (that.state.myId) {
            $.getJSON({
                type: 'POST',
                url: endpoint + this.state.myId + '/sendmsg',
                dataType: 'json',
                cache: false,
                data: { mymsg: that.refs.myInput.value },
                success: function success() {
                    that.pollServerForNewMessages;
                    console.info(that.state.response);
                    that.refs.myInput.value = '';
                },
                error: function error(xhr, status, err) {
                    console.error(endpoint + 'fetchlastmsg', status, err.toString());
                    that.refs.myInput.value = '';
                }

            });
        }
    },
    getInput: function getInput() {
        return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", placeholder: "please enter message", ref: "myInput", size: "70" }),
            React.createElement(
                "button",
                { type: "submit", onClick: this.onMessageSubmit },
                "send"
            )
        );
    },


    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    this.getMyId()
                ),
                this.getMessages()
            ),
            this.getInput()
        );
    }
});

ReactDOM.render(React.createElement(Main, null), document.getElementById("root"));