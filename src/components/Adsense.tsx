import { FC, memo } from "react";

export const Adsense: FC = () => {
  return (
    <div>
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2833905872269108"
        crossOrigin="anonymous"
      ></script> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2833905872269108"
        data-ad-slot="2361252459"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>{" "}
    </div>
  );
};
