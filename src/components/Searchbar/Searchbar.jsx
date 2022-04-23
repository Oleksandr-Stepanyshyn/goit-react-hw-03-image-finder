import { Component } from "react";
import { Header, SearchForm, SearchButton, ButtonIcon, Input} from "./Searchbar.styled";

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  }

  handleQueryChange = e => {
    this.setState({searchQuery: e.currentTarget.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      alert('Error query')
    }
    this.props.onSubmit(this.state.searchQuery)
    this.setState({searchQuery: ''})
  } 
  render () {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
        <SearchButton type="submit">
          <ButtonIcon/>
        </SearchButton>

        <Input
          type="text"
          name="searchQuery"
          value={this.state.searchQuery}
          // autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleQueryChange}
        />
      </SearchForm>
      </Header>
    )
  }
}