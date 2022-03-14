import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import "./App.css";
import { SearchBox } from "./components/search-box/search-box.component";
// import Amplify from "aws-amplify";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

// Amplify.configure({
//   auth: {
//     identityPoolId: "us-east-2:de7b048d-92f8-4b07-813d-aa168f0f511a", //REQUIRED - Amazon Cognito Identity Pool ID
//     region: "us-east-2", // REQUIRED - Amazon Cognito Region
//     userPoolId: "us-east-2_cSf3vkq2e", //OPTIONAL - Amazon Cognito User Pool ID
//     userPoolWebClientId: "4jd7sui5vdds81d38f0rkf0m0m", //OPTIONAL - Amazon Cognito Web Client ID
//   },
// });

const authenticationData = {
  Username: "robel",
  Password: "tempP@ssword12",
};

const authenticationDetails = new AuthenticationDetails(authenticationData);

const userpool = new CognitoUserPool({
  UserPoolId: "us-east-2_cSf3vkq2e",
  ClientId: "4jd7sui5vdds81d38f0rkf0m0m",
});

const userData = { Username: "robel", Pool: userpool };

const cognitoUser = new CognitoUser(userData);
class App extends Component {
  constructor() {
    super();
    // {
    //   id: 1,
    //   name: "Frankenstein",
    // },
    // {
    //   id: 2,
    //   name: "Dracula",
    // },
    // {
    //   id: 3,
    //   name: "Zombie",
    // },
    // {
    //   id: 4,
    //   name: "Clementine Rauch",
    // },
    // {
    //   id: 5,
    //   name: "Patrica Lebsack",
    // },
    // {
    //   id: 6,
    //   name: "CHelsey",
    // },
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        var accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
