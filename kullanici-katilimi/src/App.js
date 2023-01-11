import "./App.css";
import React, { useEffect, useState } from "react";
import Form from "./compenents/Form";
import Errors from "./compenents/Errors";
import * as Yup from "yup";
import axios from "axios";
import List from "./compenents/List";

let formSchema = Yup.object().shape({
  name: Yup.string().required("İsim Soyisim doldurması zorunludur."),

  email: Yup.string()
    .email("Lütfen geçerli bir mail adresi giriniz.")
    .required("E-mail girilmesi zorunludur."),

  password: Yup.string()
    .min(3, "Minimum 3 karakter giriniz.")
    .required("Password alanın doldurulması zorunludur."),

  terms: Yup.boolean().oneOf(
    [true],
    "Kullanım koşullarını kabul etmeden kayıt işlemi gerçekleşmez."
  ),
});

const dummyForm = { name: "", email: "", password: "", terms: false };
const hataErrors = { name: "", email: "", password: "", terms: "" };

function App() {
  const [form, setForm] = useState(dummyForm);
  const [error, setError] = useState(hataErrors);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", form)
      .then((res) => setData([...data, res.data]));
    setForm(dummyForm);
    setError(hataErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    e.target.type === "checkbox"
      ? setForm({ ...form, terms: !form.terms })
      : setForm({ ...form, [name]: value });
    formCheck(name, value);
  };

  const formCheck = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => setError({ ...error, [name]: "" }))
      .catch((err) => setError({ ...error, [name]: err.errors[0] }));
  };

  useEffect(() => {
    formSchema.isValid(form).then((response) => setSubmitDisable(response));
  }, [form]);

  return (
    <div className="App">
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        member={form}
        submitDisable={submitDisable}
      />
      <Errors errors={error} />

      <List data={data} />
    </div>
  );
}

export default App;
