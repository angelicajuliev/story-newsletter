import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as any;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Ha ocurrido un error en nuestro sistema, intenta de nuevo.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
