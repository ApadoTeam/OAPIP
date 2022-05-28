/**
 * @file: Comment.js
 * @description: 댓글 기능 구현
 * @author: 박찬우
 */

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { getCommnet } from '../Slices/CommentSlice';
import useAxios from 'axios-hooks';
import Spinner from '../components/Spinner';

const Comment = () => {
  // store 구독
  const { data, loading1, error } = useSelector((state) => state.comment);
  console.log(data);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 추가 axios 시작
  const [{ loading2 }, postComent] = useAxios(
    {
      url: 'http://localhost:3001/comment',
      method: 'POST',
    },
    { manual: true }
  );
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 추가 axios 끝

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 삭제 axios 시작
  const [{ loading3 }, deleteComment] = useAxios(
    {
      method: 'DELETE',
    },
    { useCache: false, manual: true }
  );
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 삭제 axios 끝

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 수정 axios 시작
  const [{ loading4 }, putComment] = useAxios(
    {
      method: 'PUT',
    },
    { useCache: false, manual: true }
  );
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 수정 axios 끝

  // store를 통해 가져온 데이터를 댓글 상태값으로 사용한다.
  const [comment, setComment] = useState([]);

  // 입력 상태값
  const [inputValue, setInputValue] = useState('');

  // 수정할 id값의 상태 값
  const [updateComment, setUpdateComment] = useState(-1);

  // 디스패치 함수 생성
  const dispatch = useDispatch();

  // id값 정의
  const nextId = useRef(1);

  // submit 함수
  const submit = () => {
    let json = null;

    (async () => {
      try {
        const response = await postComent({
          data: {
            id: nextId.current,
            text: formik.values.comment,
          },
        });

        json = response.data;
        console.log(json);
      } catch (e) {
        console.error(e);
      }
      if (json !== null) {
        window.alert('댓글이 등록되었습니다.');
      }

      setInputValue('');
      nextId.current += 1;
    })();
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 유효성 검사 시작
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .required('댓글을 입력하세요')
        .min(10, '10글자 제한ㅋㅋㅋ')
        .max(50, '50글자 이상 ㄴㄴ'),
    }),
    onSubmit: (values) => {
      submit();
    },
  });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 유효성 검사 끝

  useEffect(() => {
    setInputValue(formik.values.comment);
  }, [formik.values.comment]);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 값 가져오기 시작

  // 입력값 변경된 경우 리덕스 액션함수 호출
  useEffect(() => {
    dispatch(getCommnet(formik.values.comment));
  }, [dispatch, formik.values.comment]);

  useEffect(() => {
    setComment((comment) => data);
  }, [data]);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 값 가져오기 끝

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 삭제 시작
  const onDeleteClick = useCallback(
    (e) => {
      e.preventDefault();

      // const current = e.target;
      const getId = parseInt(e.target.dataset.id);

      if (window.confirm('댓글을 삭제하시겠습니까?')) {
        (async () => {
          let json = null;

          try {
            const response = await deleteComment({
              method: 'DELETE',
              url: `http://localhost:3001/comment/${getId}`,
            });

            json = response.data;
            console.log(json);
          } catch (e) {
            console.error(e);
          }

          if (json != null) {
            setComment((comment) => comment.filter((v, i) => v.id !== getId));
          }
        })();
      }
    },
    [deleteComment]
  );
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 삭제 끝

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 수정 시작
  const onPutClick = useCallback((e) => {
    e.preventDefault();

    setUpdateComment(parseInt(e.target.dataset.id));
  }, []);

  const onUpdateSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const getId = parseInt(e.target.id.value);
      const getComment = e.target.updateComment.value;

      (async () => {
        let json = null;

        try {
          const response = await putComment({
            method: 'PUT',
            url: `http://localhost:3001/comment/${getId}`,
            data: {
              text: getComment,
            },
          });

          json = response.data;
          console.log(json);
        } catch (e) {
          console.error(e);
        }

        if (json != null) {
          setComment((comment) => {
            const find = comment.findIndex(({ id, text }, i) => id === json.id);
            const newComment = [...comment].splice(find, 1, json);
            // newComment.splice(find, 1, json);
            return newComment;
          });
        }
      })();
      setUpdateComment(-1);
    },
    [putComment]
  );
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 수정 끝

  return (
    <div>
      <Spinner visible={loading1 || loading2 || loading3 || loading4} />

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="댓글입력"
          name="comment"
          value={inputValue}
          {...formik.getFieldProps('comment')}
          onChange={formik.handleChange}
        />
        <button type="submit">등록</button>
        {formik.touched.comment && <p style={{ color: 'red' }}>{formik.errors.comment}</p>}
      </form>

      {error ? (
        <h1>
          {error.code}
          {error.message}
        </h1>
      ) : (
        comment &&
        comment.map(({ id, text }, i) => {
          return (
            <div key={id}>
              {updateComment === id ? (
                <form onSubmit={onUpdateSubmit}>
                  <input type="hidden" name="id" defaultValue={id} />
                  <input type="text" name="updateComment" defaultValue={text} />
                  <button type="submit">수정하기</button>
                </form>
              ) : (
                <>
                  <span>{text}</span>
                  <button type="button" data-id={id} onClick={onDeleteClick}>
                    삭제
                  </button>
                  <button type="button" data-id={id} onClick={onPutClick}>
                    수정
                  </button>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default memo(Comment);
