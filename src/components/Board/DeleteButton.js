import React from 'react';
import axios from 'axios';

const DeleteButton = (seq, onRemove) => {
    const onDelete = () => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        confirmDelete && axios.post(`/api/board/${seq}`)
            .then(response => {
                if(response.data.success) {
                    alert("게시글 삭제에 성공했습니다.");
                    onRemove(seq);
                } else {
                    alert("게시글 삭제에 실패했습니다.");
                }
            })
    }
    return(
        <button style={{color: "#c62912",fontSize: "12px",lineHeight: "22px"}} onClick={onDelete}>
            삭제
        </button>
    )
};

export default DeleteButton;
