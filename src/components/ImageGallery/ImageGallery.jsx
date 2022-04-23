
import { Component } from "react"
import { fetchImg } from "services/api";
import { Gallery } from "./ImageGallery.styled"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";

export class ImageGallery extends Component {
  state = {
    images: [],
    totalImg: '',
    isLoader: false,
    error: null,
    page: 1,
  }

  componentDidUpdate (prevProps, prevSate) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;
    const prevPage = prevSate.page;
    const currentPage = this.state.page;

    if (prevQuery !== currentQuery && prevPage === currentPage ) {
      this.setState({page: 1, images: [], totalImg: ''})
    }

    if(prevQuery !== currentQuery || prevPage !== currentPage ) {
      this.setState({isLoader: true})
      console.log(this.state)
      fetchImg(currentQuery, currentPage)
        .then(data => this.setState((prevState) => { return {images: [...prevState.images, ...data.hits], totalImg: data.totalHits, isLoader: false}}))
        .catch(error => console.log(error))
    }
  }

  incrementPage = () => {
    this.setState(prevSate => {
     return {page: prevSate.page + 1}
    })
  }

  render () {
    const {images, totalImg, isLoader} = this.state;
    const showMoreButton = totalImg > images.length ;

    return(
      <>
      <Gallery>
        {images.map(images => {
          return(
            <ImageGalleryItem
              key={images.id}
              images={images}
            />
          )
        })}
      </Gallery>
      {isLoader && (<Loader/>)}
      {showMoreButton && (<Button incrementPage={this.incrementPage}/>)}
      </>
    )
  }
}