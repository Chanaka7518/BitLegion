import React, { useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, message, Upload, Space } from "antd";
import "./style.css";

// importing firebase modules
import { storage } from "../../Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface Props {
  visible3: boolean;
  handleNext3: () => void;
  handleCancel3: (values: any) => void;
  handleprevious3: () => void;
  onFinish: (downloadUrls: string[], pdfData: any[]) => void;
}

//-------------------------------------------------------------------------------------------------------------------------------------------

const PopUp3: React.FC<Props> = ({
  handleNext3,
  handleprevious3,
  handleCancel3,
  visible3,
  onFinish,
}) => {
  // const [data, setData] = useState<any[]>([]);
  // const [urls, setUrls] = useState<string[]>([]);
  const urls = useRef<any[]>([]);
  const data = useRef<string[]>([]);

  const handleUpload = (file: any) => {
    // setData([...data, file]);
    data.current.push(file);
  };

  const handleSubmit = () => {
    const promises = data.current.map((file: any) => {
      const storageRef = ref(storage, `certificates/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);

              resolve(downloadURL);
            });
          }
        );
      });
    });

    Promise.all(promises)
      .then((downloadURLs: any) => {
        console.log("All files uploaded successfully");
        urls.current.push(downloadURLs);

        onFinish(urls.current[0], data.current);
        handleNext3();
      })
      .catch((error) => {
        console.log(error.message);
      });

    //########## this is from chatgpt to delete the file from firebase################

    // // Get a reference to the Firebase Storage service
    // var storageRef = firebase.storage().ref();

    // // Get a reference to the file using the uid
    // var fileRef = storageRef.child("rc-upload-1678946576370-18");

    // // Delete the file
    // fileRef
    //   .delete()
    //   .then(function () {
    //     console.log("File deleted successfully!");
    //   })
    //   .catch(function (error) {
    //     console.error("Error deleting file: ", error);
    //   });
  };

  return (
    <Modal
      title="Sign Up"
      open={visible3}
      onCancel={handleCancel3}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item>
            <Button
              style={{ width: "100%" }}
              onClick={handleSubmit}
              type="primary"
            >
              Next
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                width: "100%",
                color: "#8794fa",
                borderColor: "#8794fa",
              }}
              danger={true}
              onClick={handleprevious3}
            >
              Back
            </Button>
          </Form.Item>
        </Space>,
      ]}
    >
      <div className="header">
        <h1>Are You Paper Qualified?</h1>
        <div className="text-container">
          <p className="text-1">
            List down all your paper qualifications to be a fitness coach
          </p>
        </div>
        <h2>"A coach who stops learning, stops growing"</h2>
      </div>

      <h3 className="sub-heading">Your list of qualifications</h3>

      <Form className="form" name="paperqulified">
        <Space
          direction="vertical"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Form.Item
            style={{
              width: "100px",
            }}
          >
            <Upload
              beforeUpload={(file) => {
                handleUpload(file);
                return false;
              }}
              multiple
            >
              <Button style={{ minWidth: "100%" }} icon={<UploadOutlined />}>
                Select File
              </Button>
            </Upload>
          </Form.Item>
          <div>
            {urls.current.map((url: any, index: number) => (
              <div key={index}>{url}</div>
            ))}
          </div>
        </Space>
      </Form>
    </Modal>
  );
};

export default PopUp3;
