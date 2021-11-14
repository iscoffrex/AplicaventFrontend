import React from "react";

export const ImageHeader = ({ user }) => {
    if (user.picture) {
        return (
            <img
                src={user.picture}
                className="userPicture"
                alt="Imagen de usuario"
            />
        );
    } else {
        return <i className="fas fa-user-circle" id="header_user_img"></i>;
    }
};