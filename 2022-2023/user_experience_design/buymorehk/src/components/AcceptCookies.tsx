import React from "react";
import { cookies } from "next/headers";
import CookiesDialog from "./CookiesDialog";

const AcceptCookies = () => {
  const nextCookies = cookies();

  return (
    <CookiesDialog isNeedOpen={nextCookies.get("cookie_setting")} />
  );
};

export default AcceptCookies;
