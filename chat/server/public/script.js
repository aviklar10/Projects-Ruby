"use strict";

/**
 * Created by aviklar10 on 03/12/2016.
 */

var endpoint = 'http://localhost:8080/';
var Card = React.createClass({
    displayName: "Card",

    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        var component = this;

        $.get(endpoint + ":id/send/:msg" + this.props.login, function (data) {
            component.setState(data);
        });
    },
    render: function render() {
        return React.createElement("div", null);
    }
});

var Form = React.createClass({
    displayName: "Form",

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var idInput = this.refs.id;
        this.props.addCard(idInput.value);
        // idInput.value = '';
    },
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
        var component = this;

        $.get(endpoint, function (data) {
            component.setState(data);
        });
    },
    // addCard: function addCard(loginToAdd) {
    //     this.setState({logins: this.state.logins.concat(loginToAdd)});
    // },
    render: function render() {
        if (!this.state.data) return null;
        return React.createElement("div", null, "Hello ", this.state.data.myid);
    }
});

var pollServerForNewMessages = function pollServerForNewMessages() {
    $.ajax({
        type: 'POST',
        url: endpoint + 'fetchprev',
        dataType: 'json',
        cache: false,
        data: { id: 6 },
        success: function (data) {
            this.setState(data);
            return React.createElement("div", null, data[0]);
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(endpoint + 'fetchprev', status, err.toString());
        }.bind(this)
    });
};
// var pollServerForNewMessages = function pollServerForNewMessages() {
//     var component = this;
//     $.ajax({
//         type: 'POST',
//         url: endpoint + 'fetchprev',
//         data: {id: 6}
//     },
//         this.setState({ posts }));
//
//     render()
//     {
//         return React.createElement(
//             "div",
//             null,
//             this.state.posts
//         );
//     }
//
// };

// setInterval(pollServerForNewMessages, 15000);

ReactDOM.render(React.createElement(Main, null), document.getElementById("root"));