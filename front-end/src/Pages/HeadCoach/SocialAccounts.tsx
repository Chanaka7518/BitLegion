import { Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";

const SocialAccounts = () => {
  const facebook: string = new URL(`./facebook.png`, import.meta.url).href;
  const instagram: string = new URL(`./instagram.png`, import.meta.url).href;
  const tiktok: string = new URL(`./tik-tok.png`, import.meta.url).href;

  const { userData } = useAuthContext();
  let userId = userData?.userId;
  const [facebookUrl, setFacebookUrl] = useState<string>("");
  const [instagramUrl, setInstagramUrl] = useState<string>("");
  const [tiktokUrl, setTiktokUrl] = useState<string>("");

  useEffect(() => {
    if (userData?.userId) {
      axios
        .get(`http://localhost:5001/api/coach/${userId}`, {})
        .then(function (response) {
          console.log(response.data.socialMediaAccounts);
          setFacebookUrl(response.data.socialMediaAccounts[0]);
          setInstagramUrl(response.data.socialMediaAccounts[1]);
          setTiktokUrl(response.data.socialMediaAccounts[2]);
          console.log(facebookUrl);
          console.log(tiktokUrl);
          console.log(instagramUrl);
        })
        .catch(function (error) {
          message.error(error);
        })
        .finally(function () {});
    }
  }, [userData]);

  return (
    <div>
      <Form>
        <Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <img
              src={facebook}
              style={{
                width: "60px",
                height: "60px",
              }}
            />
          </div>
          <Input value={facebookUrl} />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <img src={instagram} style={{ width: "60px", height: "60px" }} />
          </div>
          <Input value={instagramUrl} />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <img src={tiktok} style={{ width: "60px", height: "60px" }} />
          </div>
          <Input value={tiktokUrl} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SocialAccounts;
