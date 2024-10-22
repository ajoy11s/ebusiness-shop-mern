import React, { useEffect, useState } from "react";


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
                            <tr key={userslist.email}>
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
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-error">Delete</button>
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
