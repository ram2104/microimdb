export default function Actor (state = {}, action){
    if(action.type === "GET_ACTOR_LIST"){
        let nextState = {...state};
        // let {movies : {results = [], page, total_pages} = {}} = action;
        // nextState["movies"] = nextState["movies"] || [];
        // nextState["movies"] = nextState["movies"].concat(results);
        // nextState["currentPage"] = page;
        // nextState["totalPage"] = total_pages;
        return nextState;
    } else if(action.type === "GET_ACTOR_DETAIL"){
        let nextState = {...state};
        let {detail = {}} = action;
        nextState["detail"] = detail;
        return nextState;
    }

    return state;
}