const fetch = (request, error, success) => {
  return (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case request:
        return {
          ...state,
          loading: true,
          error: null
        };
      case error:
        return {
          ...state,
          loading: false,
          error: action.payload.value
        };
      case success:
        return {
          ...state,
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };
}
export default fetch;
