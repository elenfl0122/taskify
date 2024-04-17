import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const S = {
  CommentItemContainer: styled.ul`
    display: flex;
    align-items: center;
    padding: 1rem;
    height: 10rem;
  `,

  ProfileImage: styled(Image)`
    border-radius: 50%;
  `,

  CommentInfoBox: styled.div`
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    margin-top: 1rem;
    margin-left: 1rem;
  `,
  NameAndDateBox: styled.div`
    display: flex;
  `,

  ContentBox: styled.div``,
  CommentNickName: styled.li`
    margin: 0 1rem;
    font-weight: 600;
  `,

  CommentContent: styled.li`
    flex: 1;
    margin: 0 1rem;
    cursor: pointer;
  `,

  CommentDate: styled.li`
    margin-top: 0.3rem;
    font-size: 1.2rem;
  `,

  ButtonBox: styled.div`
    display: flex;
    gap: 0.5rem;
    margin-left: 1rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.gray};
  `,
  ModifyComment: styled.li`
    cursor: pointer;
    text-decoration: underline;
  `,
  DeleteComment: styled.li`
    cursor: pointer;
    text-decoration: underline;
  `,

  CommentInput: styled.input`
    flex: 1;
    width: 30rem;
    padding: 0.5rem;
    border: ${({ theme }) => theme.color.grayLight};
    border-radius: 0.5rem;
    margin: 0 1rem;
  `,
};

function CommentItem(props: any) {
  const [liMode, editMode] = useState(false);
  const [content, newContent] = useState(props.content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (liMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [liMode]);

  const handleEditComment = (e: any) => {
    editMode(true);
  };

  const changeHandler = (e: any) => {
    newContent(e.target.value);
  };

  const keyPressHandler = async (e: any) => {
    if (e.keyCode === 13) {
      const updatedData = e.target.value;
      await props.modify(updatedData, props.id);
      editMode(false);
    } else if (e.keyCode === 27) editMode(false);
  };

  const handleDeleteComment = () => {
    props.destroy(props.id);
  };

  return (
    <S.CommentItemContainer>
      <S.ProfileImage
        width={34}
        height={34}
        src={props.author.profileImageUrl}
        alt={'프로필 이미지'}
      />
      <S.CommentInfoBox>
        <S.NameAndDateBox>
          <S.CommentNickName>{props.author.nickname}</S.CommentNickName>
          <S.CommentDate>{formatDate(props.createdDate)}</S.CommentDate>
        </S.NameAndDateBox>
        <S.ContentBox>
          {liMode ? (
            <S.CommentInput
              type="text"
              value={content}
              onChange={changeHandler}
              ref={inputRef}
              onKeyDown={keyPressHandler}
            />
          ) : (
            <S.CommentContent>{props.content}</S.CommentContent>
          )}
        </S.ContentBox>
        <S.CommentDate>{props.date}</S.CommentDate>
        <S.ButtonBox>
          <S.ModifyComment onClick={handleEditComment}>수정</S.ModifyComment>
          <S.DeleteComment onClick={handleDeleteComment}>삭제</S.DeleteComment>
        </S.ButtonBox>
      </S.CommentInfoBox>
    </S.CommentItemContainer>
  );
}

export default CommentItem;
