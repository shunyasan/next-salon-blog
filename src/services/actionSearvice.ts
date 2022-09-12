export const ActionService = () => {
  const createActionApi = async (clinic: string, plan?: String) => {
    const body = { clinic, plan };
    await fetch("/api/action/create", {
      method: "POST",
      body: JSON.stringify(body),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    return;
  };

  return {
    createActionApi,
  };
};
