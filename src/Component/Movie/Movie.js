import React , {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Layout from "../../Layout";
import {getMovieDetail} from "../../Actions/movie";
import config from "../../config";
import {Chip, Grid} from "@material-ui/core";

class Movie extends Component {
    constructor(props){
        super(props);
        let {imageBasePath = "", thumbnailDimension = "", posterDimesion = "", faceDimension = "", mobilefaceDimension = ""} = config;
        this.state = {
            thumbnailImagePath : `${imageBasePath}${thumbnailDimension}`,
            posterImagePath: `${imageBasePath}${posterDimesion}`,
            faceImagePath:`${imageBasePath}${faceDimension}`,
            mobileFaceImagePath: `${imageBasePath}${mobilefaceDimension}`
        }
    }
    componentWillMount(){
        if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
            this.setState({isMobile: true})
        } else {
            this.setState({isMobile: false});
        }
    }

    componentDidMount(){
        let {match : {params : {id = ""}= {}} ={}} = this.props;
        if(id){
            this.props.getMovieDetail(id);
        }
    }

    render(){
        let {movies : {
            detail = {},
            detail : {
                backdrop_path = "",
                poster_path = "",
                id = "",
                title = "",
                release_date,
                vote_average, tagline, status, overview, genres = [], spoken_languages = [], 
                revenue, budget, runtime, production_companies = [], production_countries = [],
                casts : {cast = [], crew = []} = {}
            } = {}
        } = {}} = this.props;
        cast = cast.slice(0,isMobile ? 3 : 7);
        crew = crew.slice(0,isMobile ? 3 : 7);
        let {
            faceImagePath = "",
            posterImagePath = "",
            isMobile,
            mobileFaceImagePath = ""
        } = this.state;
        return <Layout className = "movie-detail-container" title = {!isMobile ? title : ""} back = {true}>
                <div className = "movie-detail" id = {id} style={{width: isMobile ? "100%" : "80%", margin: 'auto'}}>
                    {/* <div className = "movie-detail-banner-wrapper" style = {{backgroundImage : `url(${faceImagePath}${backdrop_path})`}}>

                    </div> */}
                    <div className = "overview-wrapper">
                        <img src = {isMobile ? `${faceImagePath}${poster_path}`:`${posterImagePath}${poster_path}`} className = "poster" alt = {title}/>
                        <div className = "overview">
                            <p className = "title">
                                {title} 
                                {release_date ? <span className = "release-year">({this.getYear(release_date)})</span> : ""}
                            </p>
                            {
                                genres.length > 0 ? <label className = "block-label verticalSpacing">
                                    Genres
                                </label> : ""
                            }
                            {
                               genres.map((item, key) => {
                                    let {id = "", name = ""} = item;
                                    return <Chip key = {id} label = {name} className = "genre-tags" />
                               })
                            }
                            {this.getMovieLanguages(spoken_languages)}
                            {this.getRevenueAndBudget(revenue, budget)}
                             {/* {overview ? <p className = "verticalSpacing movie-overview">{overview} </p> : ""} */}
                             <Grid container className= {`grid verticalSpacing`} justify="flex-start" spacing={16}>
                                {
                                    status ?  <Grid className = "info-grid" item xs={isMobile ? 6 : 3}>
                                        <p className = "info-label"> Status <span className = "status info">{status}</span></p>
                                    </Grid> : ""
                                }
                                {
                                    status ?  <Grid className = "info-grid" item xs={isMobile ? 6 : 3}>
                                        <p className = "info-label">Runtime <span className = "voting info"> {this.getRuntime(runtime)}</span> </p>
                                    </Grid> : ""
                                }
                                {
                                    status ?  <Grid className = "info-grid" item xs={isMobile ? 6 : 3}>
                                       <p className = "info-label">Released<span className = "release-date info">{release_date}</span></p>
                                    </Grid> : ""
                                }
                                {
                                    status ?  <Grid className = "info-grid" item xs={isMobile ? 6 : 3}>
                                        <p className = "info-label">Rating<span className = "voting info"> {vote_average} / 10</span> </p>
                                    </Grid> : ""
                                }
                             </Grid>
                        </div>
                    </div>
                    <div className = "cast-crew-wrapper">
                        {this.getProductionHouseInfo(production_companies)}
                        {this.getProductionCountry(production_countries)}
                        <div className = "cast-crew">
                            {
                                cast.length > 0 ? 
                                    <div>
                                        <label className = "block-label verticalSpacing">Casts</label>
                                        <Grid container className = "verticalSpacing">
                                            {
                                                cast.map((item, index) => {
                                                    let {character = "", name = "", id = "", profile_path = ""} = item;
                                                    return <Grid item className = "cast-crew-card" key = {id}>
                                                            <a href = {`/actor/${id}`}>
                                                                <img src = {isMobile ? `${mobileFaceImagePath}${profile_path}` : `${faceImagePath}${profile_path}`}  className = "people-poster" alt= {name}/>
                                                                <div className = "cast-crew-info">
                                                                    <p>{name}</p>
                                                                </div>
                                                            </a>
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    </div>
                                : ""
                            }
                            {
                                crew.length > 0 ? 
                                    <div className = "">
                                        <label className = "block-label verticalSpacing">Crews</label>
                                        <Grid container className = "verticalSpacing">
                                            {
                                                crew.map((item, index) => {
                                                    let {job = "", name = "", id = "", profile_path = "", department = ""} = item;
                                                    return <Grid item className = "cast-crew-card" key = {id}>
                                                            <img src = {isMobile ? `${mobileFaceImagePath}${profile_path}` : `${faceImagePath}${profile_path}`}  className = "people-poster" alt= {name}/>
                                                            <div className = "cast-crew-info">
                                                                <p>{name} - {job}</p>
                                                            </div>
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    </div>
                                : ""
                            }
                        </div>
                    </div>
                </div>
        </Layout>;
    }

    getYear(date){
        let dateObj = new Date(date);
        return dateObj.getFullYear();
    }

    getRuntime(time){
        let html = "";
        if(time){
            time = `${Math.floor(time / 60)}h ${Math.floor(time % 60)}mins`
        }
        return time;
    }

    getMovieLanguages(spoken_languages = []){
        let html = "";
        if(spoken_languages.length){
            html = <div>
                    <label className = "block-label verticalSpacing">
                        Languages
                    </label>
                    {
                        spoken_languages.map((item, key) => {
                            let {iso_639_1 = "", name = ""} = item;
                            return <Chip key = {key} label = {name} className = "genre-tags" />
                       })
                    }
                </div>
        }
        return html;
    }

    getRevenueAndBudget(revenue, budget){
        let html = "";
        if(revenue || budget){
            html = <div className = "verticalSpacing">
                {
                    budget ? <div className = "budget-wrapper">
                         <p className = "block-label">
                            Expected Budget
                        </p>
                        <p className = "currency" >$ {config.commify(budget.toFixed(2))}</p>
                    </div> : ""
                }
                {
                    revenue ? <div className = "revenue-wrapper">
                        <p className = "block-label">
                            Generated Revenue
                        </p>
                        <p className = "currency" >$ {config.commify(revenue.toFixed(2))}</p>
                    </div> : ""
                }
            </div>;
        }

        return html;
    }

    getProductionHouseInfo(production_companies = []){
        let html = "";
        if(production_companies.length > 0){
            html = <div>
            <label className = "block-label verticalSpacing">
                Production House
            </label>
            {
                production_companies.map((item, key) => {
                    let {id = "", name = "", logo_path = ""} = item;
                    return <Chip 
                        // avatar={<Avatar src= {`https://image.tmdb.org/t/p/w45${logo_path}`} />}
                        key = {id} 
                        label = {name} 
                        className = "genre-tags" 
                    />
               })
            }
        </div>
        }
        return html;
    }

    getProductionCountry(production_countries = []){
        let html = "";
        if(production_countries.length > 0){
            html = <div>
            <label className = "block-label verticalSpacing">
                Country
            </label>
            {
                production_countries.map((item, key) => {
                    let {iso_3166_1 = "", name = ""} = item;
                    return <Chip key = {key} label = {name} className = "genre-tags" />
               })
            }
        </div>
        }
        return html;
    }
}

const mapStateToProps = (state) => {
    let {movies = {}} = state
    return {
        movies
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieDetail: (id) => {
          dispatch(getMovieDetail(id));
      }
    };
}
  
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movie));