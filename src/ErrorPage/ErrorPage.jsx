import { NavLink, useRouteError } from "react-router-dom";
import error404Img from "../../public/images/error-404.png";


const ErrorPage = () => {

    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex flex-col gap-2 justify-center items-center mt-6">

            <h1 className="text-2xl font-bold">Oops!</h1>

            <img className="w-96" src={error404Img}></img>

            <p>Sorry, an unexpected error has occurred.</p>
            <p className="text-3xl text-red-600">
                <i>{error.statusText || error.message}</i>
            </p>

            <div>
                <NavLink className="btn  bg-rose-400 text-white" to={'/'}>Go back to Home</NavLink>
            </div>
        </div>
    );

};

export default ErrorPage;