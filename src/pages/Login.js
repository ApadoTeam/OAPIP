import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../Slices/LoginSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const LoginCss = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .titleBox {
    width: 480px;
    height: 50px;
    margin: 0 auto;
    margin-top: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid #ccc;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    .sign {
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 30px;
      font-weight: 800;
      line-height: 50px;
      color: #555;
      text-align: center;
      text-decoration: none;
      &:first-child {
        background-color: aliceblue;
        border-right: 1px solid #ccc;
      }
      &:hover {
        background-color: aliceblue;
        color: black;
      }
    }
  }
  .form {
    width: 480px;
    height: 350px;
    margin: 0px auto;
    border: 1px solid #ccc;
    border-top: 1px solid white;
    background-color: aliceblue;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    .loginBox {
      display: block;
      width: 400px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 20px auto;
      .inputBox {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        label {
          font-size: 15px;
          margin: 0 0 10px 3px;
          color: #555;
          
        }
        .input {
          width: auto;
          height: 30px;
          outline: none;
          padding-left: 13px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .alert {
          font-size: 12px;
          color: red;
          margin: 9px 0 2px;
          padding-left: 10px;
        }
      }
    }
    .btnBox {
      width: 400px;
      height: 100%;
      margin: 30px auto;
      button {
        width: 100%;
        height: 50px;
        background-color: #111;
        color: white;
        box-sizing: border-box;
        border: 0;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background-color: black;
        }
      }
    }
  }
`;

const Login = memo(() => {
  // React.useEffect(() => console.clear(), []);

  const { data } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  console.log(data);

  const formik = useFormik({
    initialValues: {
      id: "",
      pw: "",
      email: "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("필수 정보입니다.")
        .matches(
          /^[a-z0-9_-]{5,15}$/,
          "5~15자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
        ),
      pw: Yup.string()
        .required("필수 정보입니다.")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
          "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
        ),
      // email: Yup.string()
      //   .required("필수 정보입니다.")
      //   .matches(
      //     /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
      //     "이메일 주소를 다시 확인해주세요."
      //   ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <LoginCss>
      <nav className="titleBox">
        <NavLink className="sign" to='/singin'>Sign In</NavLink>
        <NavLink className="sign" to='/singup'>Sign Up</NavLink>
      </nav>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="loginBox" >
          <div className="inputBox">
            <label htmlFor="id"><strong>아이디</strong></label>
            
            {/* formik은 namd 값을 활용하며, onBlur...Cahge,submit 등 이벤트들은 {...formik.getFieldProps("name값")}로 묶어주면 자동으로 기능한다. */}
            {/* <input type='text' id='id' name='id' onBlur={formik.handleBlur} onChange={formik.handleChange} /> */}
            <input className="input" type="text" id="id" name="id" {...formik.getFieldProps("id")} placeholder="아이디를 입력해주세요." />
            {formik.touched.id && (<span className="alert">{formik.errors.id}</span>)}
          </div>
          <div className="inputBox">
            <label htmlFor="pw"><strong>비밀번호</strong></label>
            <input className="input" type="text" id="pw" name="pw" {...formik.getFieldProps("pw")} placeholder="비밀번호를 입력해주세요." />
            {formik.touched.pw && (<span className="alert">{formik.errors.pw}</span>)}
          </div>
          {/* <div className="inputBox">
            <label htmlFor="email"><strong>이메일</strong></label>
            <input className="input" type="text" id="email" name="email" {...formik.getFieldProps("email")} placeholder="이메일을 입력해주세요." />
            {formik.touched.email && (<span className="alert">{formik.errors.email}</span>)}
          </div> */}
        </div>
        <div className="btnBox">
            <button className="input" type="submit">
              <span>Sign In</span>
            </button>
        </div>
      </form>
    </LoginCss>
  );
});

export default Login;
