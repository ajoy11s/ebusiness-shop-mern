import React, { useEffect, useState } from "react";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";


export default function UserList() {

    const [userslist, setUsersList] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_GET_ALL_USERS)
            .then(res => res.json())
            .then(data => setUsersList(data));

    }, []);


    return (
        <div>
            <div className="flex flex-row justify-center py-2">
                <h2 className="text-green-600 font-semibold">User List</h2>
            </div>
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
                                <th className="space-x-2">
                                    <Link onClick={() => document.getElementById('my_modal_3').showModal()}> <i className="pi pi-pen-to-square" style={{ fontSize: '1.5rem' }}></i></Link>
                                    <Link> <i className="pi pi-trash" style={{ fontSize: '1.5rem' }}></i></Link>
                                    <Link> <i className="pi pi-info-circle" style={{ fontSize: '1.5rem' }}></i></Link>
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-3/4">
                    <form method="dialog" className="my-4 w-3/4">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="form-control py-2 w-3/4">
                        <input type="text" name="name" id="name" placeholder="Please enter your name" className="input input-bordered" required />
                    </div>
                    <div className="form-control py-2 w-3/4">
                        <input type="text" name="address" id="address" placeholder="Please enter your address" className="input input-bordered" required />
                    </div>
                    <div className="form-control py-2 w-3/4">
                        <input type="tel" name="tel" id="tel" placeholder="Please enter your mobile no" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-2 flex justify-center items-center">
                        <button className="btn btn-warning w-1/2">Update</button>
                    </div>
                </div>
            </dialog>


        </div>
    )
}
