import React , {Component} from "react";
import {Grid, Card, Button} from "@material-ui/core";
import config from "../config";
import InfiniteScroll from "react-infinite-scroller";

export default class MovieCard extends Component{
    constructor(props){
        super(props);
        let {imageBasePath = "", thumbnailDimension = "", mobilefaceDimension = ""} = config;
        this.state = {
            imagePath : `${imageBasePath}${thumbnailDimension}`,
            mobileFaceImagePath: `${imageBasePath}${mobilefaceDimension}`
        }
    }

    render(){
        let {movies: {movies: items = [], currentPage, totalPage} = {}, isMobile = false, classes} = this.props;
        return (
        <div>
            <InfiniteScroll
                useWindow={true}
                pageStart={1}
                threshold = {isMobile ? 200 : 400}
                hasMore = {currentPage < totalPage}
                loadMore = {() => {
                    this.props.getMoreData(currentPage + 1);
            }}> 
            <Grid container className= {`grid ${classes}`} justify="center" spacing={16}>
                {
                        items.map((item) => {
                        let {id = ""} = item;
                        if(id){
                            return <Grid key = {id} item xs={isMobile ? 12 : 6}>
                                {this.getCard(item, isMobile)}
                            </Grid>
                        } else {
                            return "";
                        }
                    })
                }
            </Grid>
            </InfiniteScroll>
        </div>
        )
    }

    getCard(item = {}, isMobile){
        let {
            id = "", 
            title = "", 
            overview = "", 
            poster_path = "",
            vote_average = "",
            release_date = ""
        } = item;

        let {imagePath = "", mobileFaceImagePath = ""} = this.state;

        return <Card className = "card">
            <a href = {`/movie/${id}`}>
                <img src = {isMobile ? `${mobileFaceImagePath}${poster_path}` : `${imagePath}${poster_path}`}  className = "thumbnail-image" alt = {title}/>
            </a>
            <div className = "card-content">
                {title ? <p className = "card-title"> {title} </p> : ""}
                <div className = "release-wrapper">
                    {release_date ? <span className = "release-date">{release_date}</span> : ""}
                    {vote_average ? <span className = "rating">Rating : {`${vote_average}/10`}</span> : ""}
                </div>
                {overview && !isMobile ? <p className = "description">{overview}</p> : ""}
                <div className = "action-area">
                    <a href = {`/movie/${id}`} className="more-info-button">
                        More Info
                    </a>
                </div>
            </div>
        </Card>
    }
}