import { NavigateOptions, useNavigate } from "react-router";

const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate("/"); // Redirect to home if no history exists
    }
  };

  return goBack;
};

const useGoTo = (to: string, options?: NavigateOptions) => {
  const navigate = useNavigate();

  const goTo = () => {
    navigate(to, options);
  };

  return goTo;
};

export { useGoBack, useGoTo };
