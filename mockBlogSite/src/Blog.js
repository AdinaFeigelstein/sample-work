import { Link } from "react-router-dom";

export default function Blog(props){
    const {name, company, website, userID} = props;

    return(
        <Link className="blog" to={`/posts/${userID}`}>
        <div >
            <h2>{name}</h2>
            <h4>{company}</h4>
            <p>{website}</p>
        </div>
        </Link>
    )
}