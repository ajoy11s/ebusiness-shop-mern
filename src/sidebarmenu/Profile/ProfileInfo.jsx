import React, { useEffect, useState, useContext } from "react";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";
import 'primeicons/primeicons.css';
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function ProfileInfo() {

    const { current_user } = useContext(AuthContext);
    const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData();
    const [userslist, setUsersList] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [error, setError] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [telValue, setTelValue] = useState('');

    const handEditleLinkClick = (email) => {
        setSelectedEmail(email);
        document.getElementById('my_modal_3').showModal();
    };

    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddressValue(event.target.value);
    };

    const handleTelChange = (event) => {
        setTelValue(event.target.value);
    };


    const handleUpdateDataButtonClick = async (e) => {
        e.preventDefault();

        if (nameValue.trim() === '') {
            alert('Name field cannot be empty!');
            return;
        }
        if (addressValue.trim() === '') {
            alert('Address field cannot be empty!');
            return;
        }
        if (telValue.trim() === '') {
            alert('Tel field cannot be empty!');
            return;
        }

        const userupdatelist = {
            name: nameValue,
            address: addressValue,
            tel: telValue
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_UPDATE_SINGLE_USERS_BY_EMAIL}${selectedEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userupdatelist),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            document.getElementById('my_modal_3').style.display = 'none';
            return data;
        } catch (error) {
            console.error('Error updating user:', error);

        }
    };


    return (
        <div className="flex justify-center items-center">
            <div className="mockup-phone">
                <div className="camera"></div>
                <div className="display">
                    <div className="artboard artboard-demo phone-1 justify-items-start">
                        <div className="avatar py-2">
                            <div className="w-24 rounded-full">
                                <img src={currentUserDataBackend?.image_url || "/images/user.png"} />
                            </div>
                        </div>
                        <div> <Link onClick={() => handEditleLinkClick(currentUserDataBackend.email)}> <i className="pi pi-pen-to-square" style={{ fontSize: '1.5rem' }}></i></Link></div>
                        <div className="card">
                            <h2 className="card-title">Name: {currentUserDataBackend?.name}</h2>
                            <p>Address: {currentUserDataBackend?.address}</p>
                            <p>Email: {currentUserDataBackend?.email}</p>
                            <p>Phone: {currentUserDataBackend?.tel}</p>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box" style={{ width: '35%' }}>
                    <form method="dialog" className="my-4 w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <span className="label-text">Your email: {selectedEmail}</span>
                    </div>
                    <div className="form-control py-2 w-full">
                        <input type="text" onChange={handleNameChange} value={nameValue} name="name" id="name" placeholder="Please enter your name" className="input input-bordered" required />
                    </div>
                    <div className="form-control py-2 w-full">
                        <input type="text" onChange={handleAddressChange} value={addressValue} name="address" id="address" placeholder="Please enter your address" className="input input-bordered" required />
                    </div>
                    <div className="form-control py-2 w-full">
                        <input type="tel" onChange={handleTelChange} value={telValue} name="tel" id="tel" placeholder="Please enter your mobile no" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-2 flex justify-center items-center w-full">
                        <button className="btn btn-warning w-1/2" onClick={handleUpdateDataButtonClick}>Update</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
