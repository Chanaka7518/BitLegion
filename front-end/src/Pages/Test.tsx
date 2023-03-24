import React, { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../Firebase";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Test = () => {
  const [data, setData] = useState<any>([]);
  const [urls, setUrls] = useState<any>([]);

  const handleUpload = (file: any) => {
    setData([...data, file]);
  };

  const handleSubmit = () => {
    const promises = data.map((file: any) => {
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
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    });

    Promise.all(promises)
      .then((downloadURLs) => {
        console.log("All files uploaded successfully");
        setUrls(downloadURLs);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDelete = async () => {
    console.log("Chanaka", data);
    try {
      for (const element of data) {
        const url = `certificates/${element.name}`;
        console.log("ToIdentify", url);
        const deleteRef = ref(storage, url);
        const result = await deleteObject(deleteRef);
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }

    // const deletePromises = data.map(async (file: any) => {
    //   console.log(`certificates/${file.name}`);
    //   const deleteRef = ref(storage, `certificates/${file.name}`);

    //   // Delete the file
    //   return deleteObject(deleteRef)
    //     .then(() => {
    //       // File deleted successfully
    //       console.log("You deleted ", file.name);
    //     })
    //     .catch((error) => {
    //       // Uh-oh, an error occurred!
    //       console.log(error.message);
    //     });
    // });

    // Promise.all(deletePromises).then(() => {
    //   console.log("All files deleted successfully");
    //   setData([]);
    // });
  };

  return (
    <div>
      <Upload
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
        multiple
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button onClick={handleSubmit}>Next</Button>
      <Button onClick={handleDelete}>Delete</Button>
      <div>
        {urls.map((url: any, index: number) => (
          <div key={index}>{url}</div>
        ))}
      </div>
    </div>
  );
};

export default Test;
