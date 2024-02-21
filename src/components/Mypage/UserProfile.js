import React, {useState} from 'react';
import profile from "../../assets/profile.png";
import { jwtUtils } from "../../utils/utils";
import "./UserProfile.scss";

const UserProfile = () => {
    const [image, setImage] = useState({});
    let inputRef;

    const saveImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        //console.log('선택이미지는 ',e.target.files[0]);
        if (e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0]);
        }
        fileReader.onload = () => {
            setImage({
                image_file: e.target.files[0],
                preview_URL: fileReader.result,
            });
        };
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
            <img className="profileImage" src= {profile} alt="profile" onClick={() => inputRef.click()} />
            <div className="nickname">{user["user_nick"]}</div>
            <div className="profileID">{user["user_email"]}</div>
        </div>
    )
}

export default UserProfile;
