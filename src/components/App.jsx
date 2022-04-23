import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";


export class App extends Component {
  state ={
    searchQuery: '',
    images: [],
    totalImg: '',
    isLoader: false,
    error: null,
    page: 1,
  }

  handleFormSubmit = (searchQuery) => {
    this.setState({searchQuery})
  }

  render () {
    const {searchQuery, isRender} = this.state;
    return(
      <>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery query={searchQuery}/>
      </>
    )
  }
};
