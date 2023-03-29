
export default function Comment(props) {
    const { name, body } = props;

    return (
        <div className="comment">
            
            <h4>{name}</h4>
            <p>{body}</p>
        </div>
    );
}