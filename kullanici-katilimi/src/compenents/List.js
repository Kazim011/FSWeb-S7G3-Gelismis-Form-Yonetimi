export default function List({ data }) {
  let listElemanları = data.map((item, index) => {
    return (
      <p key={index}>
        {item.id} numarası ile {item.name} adlı kullanıcı kayıt edilmiştir.
      </p>
    );
  });

  return <div>{listElemanları}</div>;
}
