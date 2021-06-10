import React, {Component} from 'react';
import axios from "axios";
import "./App.css"
class App extends Component {
  constructor(variables){
    super(variables)
    this.state={
      playerName: null,
      playerStats: {},
      statVal: null
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId()
  console.log(this.state.playerName)
}


handleChange = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!")
  }
}

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
     
      if(res.data.data[0] === undefined){
        alert("This player is either injured or hasn't played yet!")
      } else if(res.data.data.length > 1){
        alert("Pleases specify the name more!")
        for (var i= 0; i<res.data.data.length; i++){
          console.log(res.data.data[i])
          return(
          <div>
            <p>{res.data.data[i].last_name}</p>
          </div>
          );
        }
      } else{
        await this.getPlayerStats(res.data.data[0].id)
    
      }
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=${playerId}`)
    .then(async res => {
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }
  
  render(){
  return (
    <div className="App">
      <h1 className = "Header">
      2021 NBA REGULAR SEASON PLAYER STATS
      </h1>
     <form onSubmit={this.handleSubmit}>
       <label>
         Enter Name: 
         <input 
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
         />
       </label>
       <input type="submit" value="Search"/>
     </form>
     <div className="Single-player">
     <h3>
     Player: {this.state.playerName}
     <br />
     </h3>
     <h3>
     Games played: {this.state.playerStats["games_played"]}
     </h3>
     <h3>
     Points Per Game: {this.state.playerStats["pts"]}
     </h3>
     <h3>
     Rebounds Per Game: {this.state.playerStats["reb"]}
     </h3>
     <h3>
     Assists Per Game: {this.state.playerStats["ast"]}
     </h3>
     </div>
    </div>
  );
}
}
export default App;
