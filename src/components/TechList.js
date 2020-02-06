import React, { Component } from 'react';
import TechItem from './TechItem'

class TechList extends Component {

  // static defaultProps = {
  //
  // }

  state = {
    newTech: '',
    techs: []
  }

  // Executa assim que o componente aparece em tela
  componentDidMount(){
    const techs = localStorage.getItem('techs')

    if(techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executa sempre que houver alterações nas props ou states
  componentDidUpdate(prevProp, prevState) {
    if(prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  // Executa quando o componente deixa de existis
  componentWillUnmount(){

  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ 
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });
  }

  handleDelete = (tech) => {
    this.setState({
      techs: this.state.techs.filter( element => element != tech)
    })
  }

  render() {
    return (
      <>
      <ul>
        {this.state.techs.map( tech => 
          <TechItem 
            key={tech}
            tech={tech}
            onDelete={ () => this.handleDelete(tech) } /> )}
      </ul>

      <form onSubmit={this.handleSubmit}>
        <input 
            type="text" 
            onChange={this.handleInputChange}
            value={this.state.newTech} />

        <button type="submit">Enviar</button>
      </form>

      </>
    );
  }
}

export default TechList