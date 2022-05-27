/**
 * @file: Comment.js
 * @description: 댓글 기능 구현
 * @author: 박찬우
 */

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getCommnet } from '../Slices/CommentSlice';
import useAxios from 'axios-hooks';
import Spinner from '../components/Spinner';

const Comment = () => {

  // 입력 상태값
  const [inputValue, setInputValue] = useState('');
  
  // id값 정의
  const nextId = useRef(1);

  // 입력 값
  const onchange = useCallback(e => setInputValue(e.currentTarget.value), []);

  // - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 값 가져오기 시작
  // store 구독
  const { data, loading1, error } = useSelector(state => state.comment);

  /** data -> comment 넣어야 하는데 졸립다 */
  const [comment, setComment] = useState([]);
  console.log(comment)

  const dispatch = useDispatch();

  // 입력값 변경된 경우 리덕스 액션함수 호출
  useEffect(() => {
    dispatch(getCommnet(inputValue));
    // setComment(data);
  }, [dispatch, inputValue]);
  // - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 값 가져오기 끝


  // - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 추가 시작
  // 댓글 추가 값 정의
  const [addComment, setAddComment] = useState([]);
  
  const [{ loading2 }, refetch] = useAxios({
    url: 'http://localhost:3001/comment',
    method: 'POST',
  }, { manual: true });

  // 댓글 등록
  const onSubmit = useCallback(e => {
    e.preventDefault();

    let json = null;

    (async () => {
      try {
        const response = await refetch({
          data: {
            id: nextId.current,
            text: inputValue,
            checked: false,
          }
        });

        json = response.data;
      } catch(e) {
        console.error(e);
      }
      console.log(json)
      if(json !== null) {
        window.alert('댓글이 등록되었습니다.');
      };
      setAddComment(addComment.concat(json));
      setInputValue('');
      nextId.current += 1;
    })();
  }, [inputValue, refetch, addComment]);
  // - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 추가 끝


  // - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 삭제 시작
  const [{loading3}, deleteComment] = useAxios({
    method: 'DELETE'
  }, { useCache: false, manual: true });

  const onDeleteClick = useCallback(e => {
    e.preventDefault();

    const current = e.target;
    const getId = parseInt(current.dataset.id);

    if(window.confirm('댓글을 삭제하시겠습니까?')) {
      (async () => {
        let json = null;

        try {
          const response = await deleteComment({
            method: 'DELETE',
            url: `http://localhost:3001/comment/${getId}`
          });

          json = response.data;
        } catch(e) {
          console.error(e);
        }

        if(json != null) {
          // setGrade(grade => grade.filter((v,i) => v.id !== id));
        }
      })();
    }
  }, [deleteComment]);
  // - - - - - - - - - - - - - - - - - - - - - - - - - 댓글 삭제 끝


  return (
    <div>

      <Spinner visible={loading1 || loading2 || loading3} />

      <form onSubmit={onSubmit}>
        <input type='text' placeholder='댓글입력' name='comment' value={inputValue} onChange={onchange} />
        <button type='submit'>등록</button>
      </form>
      
      {error ? (
        <h1>{error.code}{error.message}</h1>
      ) : (
        data && data.map(({id, text},i) => {
          return (
            <div key={id}>
              <span>댓글{id}: {text}</span>
              <button type='button' data-id={id} onClick={onDeleteClick}>삭제</button>
            </div>

          );
        })
      )}
    </div>
  );
};

export default memo(Comment);