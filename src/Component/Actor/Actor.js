import React , {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Layout from "../../Layout";
import {getActorDetail} from "../../Actions/actor";
import config from "../../config";
import {Chip, Grid} from "@material-ui/core";

class Actor extends Component {
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
            this.props.getActorDetail(id);
        }
    }

    render(){
        let {
            faceImagePath = "",
            posterImagePath = "",
            isMobile,
            mobileFaceImagePath = ""
        } = this.state;
        let {about : {
            name = "", profile_path = "", place_of_birth = "",
            biography = "", also_known_as = [],
            known_for_department = "", gender = "", birthday = "",
            movies : {cast = []} = {}
        } = {}} = this.props;
        cast = cast.slice(0,isMobile ? 3 : 7);

        return <Layout className = "actor-detail-container"  title = {name} back = {true}>
                <div className = "actor-detail" style={{width: isMobile ? "100%" : "80%", margin: 'auto'}}>
                    <div className = "overview-wrapper">
                        {
                            profile_path ? 
                                <img src = {`${posterImagePath}${profile_path}`} className = "poster" alt = {name}/>
                            : ""
                        }
                        <div className = "overview">
                            <p className = "title">
                                {name} 
                            </p>
                            {this.getBiography(biography, gender)}
                            {this.getDOBGender(birthday, gender)}
                            {this.getPlaceOfBirth(place_of_birth)}
                            {this.knownFor(known_for_department)}
                            {
                                also_known_as.length > 0 ? <label className = "block-label verticalSpacing">
                                    Also known as
                                </label> : ""
                            }
                            {
                               also_known_as.map((item, key) => {
                                    return <Chip key = {key} label = {item} className = "genre-tags" />
                               })
                            }
                        </div>
                    </div>
                    <div className = "cast-crew-wrapper">
                        <div className = "cast-crew">
                        {
                                cast.length > 0 ? 
                                    <div>
                                        <label className = "block-label verticalSpacing">Movies</label>
                                        <Grid container className = "verticalSpacing">
                                            {
                                                cast.map((item, index) => {
                                                    let {character = "", title = "", id = "", poster_path = ""} = item;
                                                    return <Grid item className = "cast-crew-card" key = {id}>
                                                            <a href = {`/movie/${id}`}>
                                                                <img src = {isMobile ? `${mobileFaceImagePath}${poster_path}` : `${faceImagePath}${poster_path}`}  className = "people-poster" alt= {name}/>
                                                                <div className = "cast-crew-info">
                                                                    <p>{title}</p>
                                                                </div>
                                                            </a>
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

    getBiography(biography, gender){
        let html = "";

        if(biography){
            html = <div>
                <label className = "block-label verticalSpacing">
                    About {gender == 2 ? "Him" : "Her"}
                </label>
                <p className = "info">
                    {biography}
                </p> 
            </div>
        }
        return html;
    }

    getPlaceOfBirth(place_of_birth){
        let html = "";

        if(place_of_birth){
            html = <div>
                <label className = "block-label verticalSpacing">
                    Place of birth
                </label>
                <p className = "info">
                    {place_of_birth}
                </p> 
            </div>
        }
        return html;
    }

    getDOBGender(birthday, gender){
        let html = "";
        if(birthday || gender){
            html = <div className = "verticalSpacing">
                {
                    birthday ? <div className = "birthday-wrapper">
                         <p className = "block-label">
                            Birthday
                        </p>
                        <p className = "birthday info" >{birthday}</p>
                    </div> : ""
                }
                {
                    gender ? <div className = "gender-wrapper">
                        <p className = "block-label">
                            Gender
                        </p>
                        <p className = "gender info" >{gender == 2 ? "Male" : "Female"}</p>
                    </div> : ""
                }
            </div>;
        }
        return html;
    }

    knownFor(known_for_department){
        let html = "";

        if(known_for_department){
            html = <div>
                <label className = "block-label verticalSpacing">
                    Known For
                </label>
                <p className = "info">
                    {known_for_department}
                </p> 
            </div>
        }
        return html;
    }

}
    

const mapStateToProps = (state) => {
    let {actor : {detail = {}} = {}} = state
    return {
        about : detail
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getActorDetail: (id) => {
          dispatch(getActorDetail(id));
      }
    };
}
  
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Actor));