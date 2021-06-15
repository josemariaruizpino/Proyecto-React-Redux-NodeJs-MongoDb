import { useState } from "react";
import { register } from "../../api/auth.api";
import './Register.scss';

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
};

const Register = (props) => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState("");

  const submit = async (ev) => {
    ev.preventDefault();

    try {
      const user = await register(form);
      setForm(INITIAL_STATE);
      props.history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const changeInput = (ev) => {
    const { name, value } = ev.target;

    setForm({ ...form, [name]: value });
  };

  console.log(props);

  return (
    
    <div className="background">
    <img className="logo" src="https://i.ibb.co/LtSRCS5/Logo.png" alt="Logo" border="0"/>
    <h1 className="title">Register</h1>

      <form onSubmit={submit} className = "form-container-register">
        <label htmlFor="email">
          <p className="form-container__text">Email</p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            onChange={changeInput}
            value={form.email}
          />
        </label>
        <label htmlFor="username">
          <p className="form-container__text">Nombre de Usuario</p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={changeInput}
            value={form.username}
          />
        </label>

        <label htmlFor="password">
          <p className="form-container__text">Password</p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={changeInput}
            value={form.password}
          />
        </label>

        <button type="submit" className="form-container__button">Registro</button>

        {error && <div className="error">{error}</div>}
      </form>
      <a href="/login" className="link">¿Ya tienes un usuario?</a>
    </div>
  );
};

export default Register;
