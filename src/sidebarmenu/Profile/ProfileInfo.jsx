import React, { useEffect, useState, useContext } from "react";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function ProfileInfo() {

    const { current_user } = useContext(AuthContext);
    const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData();

    return (
        <div className="flex justify-center items-center">
            <div className="mockup-phone">
                <div className="camera"></div>
                <div className="display">
                    <div className="artboard artboard-demo phone-1">
                        <div className="avatar py-10">
                            <div className="w-24 rounded-full">
                                <img src={currentUserDataBackend?.image_url || "/images/user.png"} />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{currentUserDataBackend?.name}</h2>
                            <p>{currentUserDataBackend?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
