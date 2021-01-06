import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'

import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    api: [],
    search: ''
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(pokemon => {
      this.setState({
        api: pokemon
        // filteredApi: pokemon
      })
    })
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleNew = (newPokeObj) => {
    const newPoke = {
      name: newPokeObj.name,
      hp: newPokeObj.hp,
      sprites: {
        front: newPokeObj.frontUrl,
        back: newPokeObj.backUrl
      }
    }
    fetch('http://localhost:3000/pokemon',{
      method: 'POST',
      headers: {
        'Content-Type':'application-json',
        'Accepts': 'application-json'
      },
      body: JSON.stringify(newPoke)
    })
    .then(res => res.json())
    .then(newPoke => this.setState({
      api: [...this.state.api, newPoke]
    }))
  }


  filterPokemon = () => {
    return this.state.api.filter(poke => poke.name.toLowerCase().includes(this.state.search.toLowerCase()))
  }

  render() {
    // console.log('dataOne', this.state.api)

    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm newPokemon={this.handleNew}/>
        <br />
        <Search searchHandler={this.handleSearch} searchInput={this.state.search}/>
        <br />
        <PokemonCollection poke={this.filterPokemon()} />
      </Container>
    )
  }
}

export default PokemonPage
