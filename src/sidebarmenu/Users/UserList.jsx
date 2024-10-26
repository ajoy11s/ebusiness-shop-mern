import React, { useEffect, useState, useContext } from "react";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoginUserBackendData } from "../../components/UseLoginUserDataBackend";

export default function UserList() {

    const [userslist, setUsersList] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [error, setError] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [telValue, setTelValue] = useState('');
    const { current_user } = useContext(AuthContext);
    const { currentUserDataBackend, setCurrentUserDataBackend } = useLoginUserBackendData();

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
        console.log(selectedEmail);
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
            fetchAfterDataEditItems();
            return data;
        } catch (error) {
            console.error('Error updating user:', error);

        }
    };


    useEffect(() => {
        fetch(import.meta.env.VITE_GET_ALL_USERS)
            .then(res => res.json())
            .then(data => setUsersList(data));

    }, []);

    const fetchAfterDataEditItems = async () => {
        fetch(import.meta.env.VITE_GET_ALL_USERS)
            .then(res => res.json())
            .then(data => setUsersList(data));
    };


    return (
        <div>
            <div className="flex flex-row justify-center py-2">
                <h2 className="text-green-600 font-semibold">User List</h2>
            </div>
            {
               current_user && currentUserDataBackend && currentUserDataBackend.isadmin && (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-slate-200 font-semibold text-green-600 text-sm">
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <th>Name/Address</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {userslist.map((users) => (
                                    <tr key={users.email}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={users.image_url}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{users.name}</div>
                                                    <div className="text-sm opacity-50">{users.address}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {users.email}
                                        </td>
                                        <td>{users.tel}</td>
                                        <td>{users.isactive ? "Active" : "InActive"}</td>
                                        <td>{
                                            users.isgeneraluser
                                                ? "User"
                                                : users.isadmin
                                                    ? "Admin"
                                                    : users.issystemadmin ? "SystemAdmin" : ""
                                        }</td>
                                        {users.issystemadmin ? ("") : (
                                            <th className="space-x-2">
                                                <Link onClick={() => handEditleLinkClick(users.email)}> <i className="pi pi-pen-to-square" style={{ fontSize: '1.5rem' }}></i></Link>
                                                 <Link> <i className="pi pi-info-circle" style={{ fontSize: '1.5rem' }}></i></Link>
                                            </th>
                                        )
                                        }
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }

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
        </div >
    )
}
