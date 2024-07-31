import * as Uil from "@iconscout/react-unicons";

export default function Button(props) {
  const Unicons = Uil[props.icon];

  return (
    <button type={props.type} onClick={props.onClick} className={props.class} title={props.title}>
      {Unicons && <Unicons size="15" color="#fff" />} {props.text ? props.text : ""}
    </button>
  );
}
