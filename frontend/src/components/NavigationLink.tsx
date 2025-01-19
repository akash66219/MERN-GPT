import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <>
      <Link
        onClick={props.onClick}
        className="nav-link"
        to={props.to}
        style={{ margin: "10px" }}
      >
        <button style={{ color: "--clr:#0FF0FC", backgroundColor: "cyan" }}>
          <span>{props.text}</span><i></i>
        </button>
      </Link>
    </>
  );
};

export default NavigationLink;