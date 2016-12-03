"use strict";

var /**
 * Created by aviklar10 on 03/12/2016.
 */Card = React.createClass({
    displayName: "Card",

    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        var component = this;

        $.get("http://localhost:8080/:id/send/:msg" + this.props.login, function (data) {
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
        return {logins: []};
    },
    componentDidMount: function componentDidMount() {
        var component = this;

        $.get("http://localhost:8080/", function (data) {
            component.setState(data);
        });
    },
    addCard: function addCard(loginToAdd) {
        this.setState({logins: this.state.logins.concat(loginToAdd)});
    },
    render: function render() {
        var cards = this.state.logins.map(function (login) {
            return React.createElement(Card, {login: login});
        });

        return React.createElement(
            "div",
            null,
            React.createElement(Form, {addCard: this.addCard}),
            cards
        );
    }
});

//
// function mapDispatchToProps(dispatch) {
//     return {
//         dataActions: bindActionCreators(DataActions, dispatch)
//     };
// }
//
// function mapStateToProps(state) {
//     return {
//         data: state.data.data,
//         isFetching: state.data.isFetching
//     };
// }
//
//
// function dataFetch(prev_id) {
//     $.get("http://localhost:8080/fetchprev" , function (data) {
//         data:{
//             id: prev_id
//         }
//         component.setState(data);
//     });
//     return {
//         [CALL_API]: {
//             types: [DATA_FETCH_BEGIN, DATA_FETCH_SUCCESS, DATA_FETCH_ERROR],
//             endpoint: '/fetchprev'
//         }
//     };
// }


// // @connect(mapStateToProps, mapDispatchToProps)
// var AppContainer = React.createClass ( {
//     componentWillReceiveProps(nextProps) {
//         if (this.props.data !== nextProps.data) {
//
//             clearTimeout(this.timeout);
//
//             // Optionally do something with data
//
//             if (!nextProps.isFetching) {
//                 this.startPoll();
//             }
//         }
//     },
//
//     componentWillMount() {
//         this.props.dataActions.dataFetch();
//     },
//
//     componentWillUnmount() {
//         clearTimeout(this.timeout);
//     },
//
//     startPoll() {
//         this.timeout = setTimeout(() => this.props.dataActions.dataFetch(this.props.prev_id), 3000);
//     }
// })

var pollServerForNewMessages = function pollServerForNewMessages(prev_id) {
    $.getJSON('http://localhost:8080/fetchprev', function (response) {
        data:{
            id: 2
        }
        if (response.id) {
            alert("New mail. At last. You made me walk all the way to the server and back every " + "second for this, so if this isn't life-or-death, you got another thing coming.");
        }
    });
};
setInterval(pollServerForNewMessages, 3000);

ReactDOM.render(React.createElement(Main, null), document.getElementById("root"));