export default function Movies(state = {}, action) {
    if(action.type === "GET_POPULAR_MOVIE"){
        let nextState = {...state};
        let {movies : {results = [], page, total_pages} = {}} = action;
        console.log(action.movies);
        nextState["movies"] = nextState["movies"] || [];
        nextState["movies"] = nextState["movies"].concat(results);
        nextState["currentPage"] = page;
        nextState["totalPage"] = total_pages;
        return nextState;
    } else if(action.type === "GET_MOVIE_DETAIL"){
        let nextState = {...state};
        let {detail = {}} = action;
        nextState["detail"] = detail;
        return nextState;
    } else if(action.type === "SEARCH_RESULT"){
        let nextState = {...state};
        let {noresult = false } = action;
        nextState["noresult"] = noresult;
        return nextState;
    }

    return state;
}