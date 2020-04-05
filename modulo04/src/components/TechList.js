import React, { Component } from 'react';

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  }

  componentDidMount() {
    const techs = localStorage.getItem('techs');
    if (techs) {
      this.setState({techs: JSON.parse(techs)})
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: '',
    })
  }

  handleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech)})
  }

  render() {
    return (
      <>
        <h1>{this.state.newTech}</h1>
        <form onSubmit={this.handleSubmit}>
          <ul>
            {this.state.techs.map(tech => <TechItem tech={tech} key={tech} onDelete={() => this.handleDelete(tech)} />)}
          </ul>
          <input onChange={this.handleInputChange} value={this.state.newTech} type="text" />
          <button type="submit">Enviar</button>
        </form>
      </>
    )
  }
}

export default TechList;
