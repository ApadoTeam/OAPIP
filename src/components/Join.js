/**
 * @file: Join.js
 * @description: 회원가입 기능 구현
 * @author: 천경재
 */

import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../Slices/UserInfoSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import Spinner from "./Spinner";

const JoinCss = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .titleBox {
    width: 480px;
    height: 50px;
    margin: 0 auto;
    margin-top: 100px;
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
        border-right: 1px solid #ccc;
      }
      &:hover {
        background-color: aliceblue;
        color: black;
        font-size: 31px;
        transition: all 0.2s;
      }
    }
    .active {
      background-color: aliceblue;
    }
  }
  .form {
    width: 480px;
    height: 550px;
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
      height: 400px;
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
      height: auto;
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
          font-size: 21px;
          transition: all 0.2s;
        }
      }
    }
  }
`;

const Join = memo(() => {
  // React.useEffect(() => console.clear(), []);

  const { data } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  // 페이지 이동 hook
  const navigate = useNavigate();

  const [{ loading2 }, refetch]  = useAxios(
    {
      url: "http://localhost:3001/userInfo",
      method: "POST",
    },
    { manual: true }
  );
    // console.log(data);

  const formik = useFormik({
    initialValues: {
      id: "",
      pw: "",
      pwCfm: "",
      email: "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("필수 정보입니다.")
        .matches(/^[a-z0-9_-]{5,15}$/, "5~15자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."),
      pw: Yup.string()
        .required("필수 정보입니다.")
        .matches(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^*+=-])[a-zA-Z0-9!@#$%^*+=-]{8,16}$/, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."),
      pwCfm: Yup.string()
        .required("필수 정보입니다.")
        .oneOf([Yup.ref("pw"), null], "비밀번호가 일치하지 않습니다."),
      email: Yup.string()
        .required("필수 정보입니다.")
        .matches(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/, "이메일 주소를 다시 확인해주세요."),
    }),
    onSubmit: (values) => {
      if (data.id !== values.id) {
        if (data.email !== values.email) {
          let json = null;
          (async () => {
            try {
              const response = await refetch({
                data: {
                  id: values.id,
                  pw: values.pw,
                  email: values.email,
                },
              });
              json = response.data;
            } catch (e) {
              console.error(e);
            }
            if (json !== null) {
              window.alert("회원가입이 완료 되었습니다..");
              navigate("/", { replace: true });
            }
          })();
        } else {
          alert("이미 사용중인 이메일 입니다.");
        }
      } else {
        alert("이미 사용중인 아이디 입니다.");
      }
    },
  });

  return (
    <JoinCss>
      <Spinner visible={loading2} />
      <nav className="titleBox">
        <NavLink className="sign" to="/">
          Sign In
        </NavLink>
        <NavLink className="sign" to="/signup">
          Sign Up
        </NavLink>
      </nav>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="loginBox">
          <div className="inputBox">
            <label htmlFor="id"><strong>아이디</strong></label>
            <input className="input" type="text" id="id" name="id" {...formik.getFieldProps("id")} placeholder="아이디를 입력해주세요." />
            {formik.touched.id && (<span className="alert">{formik.errors.id}</span>)}
          </div>
          <div className="inputBox">
            <label htmlFor="pw"><strong>비밀번호</strong></label>
            <input className="input" type="password" id="pw" name="pw" {...formik.getFieldProps("pw")} placeholder="비밀번호를 입력해주세요." />
            {formik.touched.pw && (<span className="alert">{formik.errors.pw}</span>)}
          </div>
          <div className="inputBox">
            <label htmlFor="pwCfm"><strong>비밀번호 확인</strong></label>
            <input className="input" type="password" id="pwCfm" name="pwCfm" {...formik.getFieldProps("pwCfm")} placeholder="비밀번호를 재입력해주세요." />
            {formik.touched.pwCfm && (<span className="alert">{formik.errors.pwCfm}</span>)}
          </div>
          <div className="inputBox">
            <label htmlFor="email"><strong>이메일</strong></label>
            <input className="input" type="text" id="email" name="email" {...formik.getFieldProps("email")} placeholder="이메일을 입력해주세요." />
            {formik.touched.email && (<span className="alert">{formik.errors.email}</span>)}
          </div>
        </div>
        <div className="btnBox">
          <button className="input" type="submit">
            <span>Sign Up</span>
          </button>
        </div>
      </form>
    </JoinCss>
  );
});

export default Join;
