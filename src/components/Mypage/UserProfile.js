import React from 'react';
//import profile from "../../assets/profile.png";
import { jwtUtils } from "../../commons/utils";
import "./UserProfile.scss";

const UserProfile = ({ profileImg, setImage, submitProfileImg }) => {
    let inputRef;

    const saveImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        console.log('선택이미지는 ',e.target.files[0]);
        if (e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0]);
        }
        fileReader.onload = () => {
            setImage({
                imgFile: e.target.files[0],
                profileImg: fileReader.result,
            });
            console.log('set이미지실행');
        };

        submitProfileImg();
        console.log('펑션실행');
    };
    const user = jwtUtils.getUser();
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={saveImage}
                ref={(refParam) => (inputRef = refParam)}
                style={{ display: "none" }}
            />
            <img className="profileImage" src={profileImg} alt="profileImage" onClick={() => inputRef.click()} />
            <div className="nickname">{user["user_nick"]}</div>
            <div className="profileID">{user["user_email"]}</div>
        </div>
    )
}

export default UserProfile;
