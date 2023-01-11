import React from "react";


export default function Form(props) {
const {handleChange,handleSubmit,member,submitDisable} = props;

return(

    <form onSubmit={handleSubmit} >

        <label htmlFor="name">İsim Soyisim:
            <input type="text" id="name" name="name" onChange={handleChange} value={member.name}  />
        </label>

        <label htmlFor="email">E-mail:
            <input type="email" id="email" name="email" onChange={handleChange} value={member.email}  />
        </label>

        <label htmlFor="password">Şifre:
            <input type="password" id="password" name="password" onChange={handleChange}  value={member.password} />
        </label>

        <label htmlFor="terms">
            Kayıt koşullarını kabul ediniz.
            <input checked={member.terms} type="checkbox" id="terms" name="terms" onChange={handleChange} value={!member.terms}  />
        </label>

        <input  type="submit" value="Kaydet"  disabled={!submitDisable}/>



    </form>

)


}