import React from 'react';
import api from '../../utils/api';
import { toast, ToastContainer } from "react-toastify";

const DeleteButton = ({seq, onRemove, type}) => {
    const onBoardDelete = () => {
        const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
        confirmDelete && api.delete(`/api/board/${seq}`)
            .then(res => {
                if(res.data.success) {
                    toast.success(<h3>게시글 삭제에 했습니다.!</h3>, {
                        position: "top-center",
                        hideProgressBar: true,
                        autoClose: 2000
                    });
                    onRemove();
                }
            })
            .catch(err => {
                toast.error(err.response.data.message+ "😭", {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 2000
                });
            })
    }

    const onCommentDelete = () => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        confirmDelete && api.delete(`/api/comment`, {data:{seq: seq}})
            .then(res => {
                if(res.data.success) {
                    toast.success(<h3>댓글 삭제에 했습니다.!</h3>, {
                        position: "top-center",
                        hideProgressBar: true,
                        autoClose: 2000
                    });
                    onRemove();
                }
            })
            .catch(err => {
                toast.error(err.response.data.message+ "😭", {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 2000
                });
            })

    }

    const onDelete = () => {
        /*toast(<h3>댓글</h3>, {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 2000
        });*/
        return type === 'B' ? onBoardDelete():onCommentDelete();
    }
    return (
        <>
            <ToastContainer/>
            <button style={{color: "#c62912",fontSize: "12px",lineHeight: "22px"}} onClick={onDelete}>
                삭제
            </button>
        </>
    )
};

export default DeleteButton;
