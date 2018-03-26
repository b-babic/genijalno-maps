const ui = (
  state = {
    sidebar: ""
  },
  action
) => {
  switch (action.type) {
    case "ACTIVATE_SIDEBAR":
      return { ...state, sidebar: "active" };
    case "DEACTIVATE_SIDEBAR":
      return { ...state, sidebar: "" };
    default:
      return state;
  }
};

export default ui;
