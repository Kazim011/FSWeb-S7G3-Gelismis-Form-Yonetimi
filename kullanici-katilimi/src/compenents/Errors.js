export default function Errors(props) {
  const { errors } = props;
  const errorarray = Object.values(errors);
  return errorarray.map((item, sayac) => <p key={sayac}>{item}</p>);
}
