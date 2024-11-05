import React from 'react'
import { useAppSelector, useAppDispatch } from './app/hooks';
import { selectAuth } from './authSlice'
const Greet = () => {
    const isAuth = useAppSelector(selectAuth);
    return (
        <div>

            {isAuth ? "welcome.." : "please login"}

        </div>
    )
}

export default Greet