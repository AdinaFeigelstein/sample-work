import Blog from "./Blog";
import React, { useState, useEffect } from 'react';

export default function Blogs() {
    const [users, setUsers] = useState();

    useEffect(() => {
        async function loadBlogs() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const users = await response.json();
                setUsers(users);
            } catch (e) {
                console.error('oops', e);
            }
        }
        loadBlogs();
    }, []);

    return (
        <div id="blogContainer">
            {users?.map((user, i) => {
                return (
                    <Blog key = {i} name={user.name} company={user.company.name} website={user.website} userID = {user.id}/>
                );
            })}
        </div >
    );
}