import React, { useState, useRef } from "react";
import { Form, Button } from "antd";
import PopUp1 from "./PopUp1";
import PopUp2 from "./PopUp2";
import PopUp3 from "./PopUp3";
import PopUp4 from "./PopUp4";
import PopUp5 from "./PopUp5";
import PopUp6 from "./PopUp6";
import PopUp7 from "./PopUp7";
import PopUp8 from "./PopUp8";
import useSignup from "../../Hooks/useSignup";
import { useNavigate } from "react-router";

// interface Props {
//   visible1Modal: boolean;
// }
const HeadCoachSignUp: React.FC = () => {
  const NavigateTo = useNavigate();
  const [form] = Form.useForm();

  const { signup, error, isLoading } = useSignup();

  // ---------------------------To send data------------------------------

  const firstModal = useRef<string[]>([]);
  const secondtModal = useRef<string[]>([]);
  const thirdtModalDownloadUrls = useRef<string[]>([]);
  const thirdtModalDetails = useRef<any[]>([]);
  const fourthModal = useRef<string[]>([]);
  const fifthModal = useRef<string[]>([]);

  interface PACKAGE {
    title: string;
    rate: string;
    minOrderNumber: string;
    discount: string;
    from: string;
    to: string;
  }

  const [onlineCoaching, setOnlineCoaching] = useState<PACKAGE>({
    title: "",
    rate: "",
    minOrderNumber: "",
    discount: "",
    from: "",
    to: "",
  });

  const [personalTraining, setPersonalTraining] = useState<PACKAGE>({
    title: "",
    rate: "",
    minOrderNumber: "",
    discount: "",
    from: "",
    to: "",
  });

  const socialAccouts = useRef<string[]>([]);
  let subscription: boolean;

  const handleFormFinish1 = (values: any) => {
    firstModal.current.push(values.current);
    console.log(firstModal.current[0]);
  };

  const handleFormFinish2 = (values: any) => {
    secondtModal.current.push(values.current);
    console.log(secondtModal.current[0]);
  };
  const handleFormFinish3 = (downloadUrls: any, pdfData: any[]) => {
    thirdtModalDownloadUrls.current.push(downloadUrls);
    thirdtModalDetails.current.push(pdfData);
  };

  const handleFormFinish4 = (values: any) => {
    fourthModal.current.push(values.current);
    console.log(fourthModal.current[0]);
  };

  const handleFormFinish5 = (values: any) => {
    fifthModal.current.push(values.current);
    console.log(fifthModal.current[0]);
  };

  const handleFormFinish6 = (PT: PACKAGE, OC: PACKAGE) => {
    setPersonalTraining(PT);
    setOnlineCoaching(OC);
  };

  const handleFormFinish7 = (
    facebook: string,
    instagram: string,
    tiktok: string
  ) => {
    socialAccouts.current.push(facebook);
    socialAccouts.current.push(instagram);
    socialAccouts.current.push(tiktok);
  };

  const handleFormFinish8 = async (isSubscribed: boolean) => {
    let fName = firstModal.current[0][0];
    let lastName = firstModal.current[0][1];
    let password = firstModal.current[0][2];
    let address = firstModal.current[0][3];
    let nicNumber = firstModal.current[0][4];
    let gender = firstModal.current[0][5];
    let mobileNumber = secondtModal.current[0][0];
    let whatsapp = secondtModal.current[0][1];
    let landLine = secondtModal.current[0][2];
    let email = secondtModal.current[0][3];
    let website = secondtModal.current[0][4];
    let athleticArchievements = fourthModal.current;
    let experiences = fifthModal.current;
    let accounts = socialAccouts.current;

    await signup(
      fName,
      lastName,
      password,
      address,
      nicNumber,
      gender,
      mobileNumber,
      whatsapp,
      landLine,
      email,
      website,
      athleticArchievements,
      experiences,
      personalTraining,
      onlineCoaching,
      accounts,
      isSubscribed,
      thirdtModalDownloadUrls.current[0],
      thirdtModalDetails.current[0]
    );

    // setVisible8(false);
  };

  //-----------------Visibility of modals-----------------
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  //-----------------popup1-------------------------------
  const handleNext1 = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();
        setVisible1(!visible1);
        setVisible2(!visible2);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel1 = () => {
    form.resetFields();
    setVisible1(false);
    NavigateTo("/");
  };
  //--------------------------------------------popup2

  const handleNext2 = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();
        setVisible2(!visible2);
        setVisible3(!visible3);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleprevious2 = () => {
    form1Ref.resetFields();
    setVisible2(!visible2);
    setVisible1(!visible1);
  };
  const handleCancel2 = () => {
    form1Ref.resetFields();
    NavigateTo("/");
    setVisible2(!visible2);
  };

  //--------------------------------------------popup3
  const [form1Ref]: any = Form.useForm();

  const handleNext3 = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();

        setVisible3(!visible3);
        setVisible4(!visible4);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleprevious3 = () => {
    form.resetFields();
    setVisible3(!visible3);
    setVisible2(!visible2);
  };
  const handleCancel3 = () => {
    form1Ref.resetFields();
    NavigateTo("/");
    setVisible3(!visible3);
  };
  //--------------------------------------------popup4

  const handleNext4 = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();
        setVisible4(!visible4);
        setVisible5(!visible5);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleprevious4 = () => {
    form.resetFields();
    setVisible4(!visible4);
    setVisible3(!visible3);
  };
  const handleCancel4 = () => {
    form1Ref.resetFields();
    setVisible4(!visible4);
    NavigateTo("/");
  };

  //--------------------------------------------popup5

  const handleNext5 = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();
        setVisible5(!visible5);
        setVisible6(!visible6);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleprevious5 = () => {
    form.resetFields();
    setVisible5(!visible5);
    setVisible4(!visible4);
  };
  const handleCancel5 = () => {
    form1Ref.resetFields();
    setVisible5(!visible5);
    NavigateTo("/");
  };
  //--------------------------------------------popup6

  const handleNext6 = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();
        setVisible6(!visible6);
        setVisible7(!visible7);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleprevious6 = () => {
    form.resetFields();
    setVisible6(!visible6);
    setVisible5(!visible5);
  };
  const handleCancel6 = () => {
    form1Ref.resetFields();
    setVisible6(!visible6);
    NavigateTo("/");
  };
  //--------------------------------------------popup7

  const handleNext7 = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();
        setVisible7(!visible7);
        setVisible8(!visible8);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleprevious7 = () => {
    form.resetFields();
    setVisible7(!visible7);
    setVisible6(!visible6);
  };
  const handleCancel7 = () => {
    form1Ref.resetFields();
    setVisible7(!visible7);
    NavigateTo("/");
  };

  //--------------------------------------------popup8

  const handleFinish = () => {
    form
      .validateFields()
      .then(() => {
        form.resetFields();

        setVisible8(!visible8);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleprevious8 = () => {
    form.resetFields();
    setVisible8(!visible8);
    setVisible7(!visible7);
  };
  const handleCancel8 = () => {
    form1Ref.resetFields();
    setVisible8(!visible8);
  };
  // ----------------------------------------------------

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20%",
      }}
    >
      {/* <Test /> */}
      {/* <Button type="primary" onClick={showModal}>
        SignUp
      </Button> */}

      <PopUp1
        handleNext1={handleNext1}
        handleCancel1={handleCancel1}
        visible1={visible1}
        onFinish={handleFormFinish1}
      />

      <PopUp2
        onFinish={handleFormFinish2}
        handleNext2={handleNext2}
        handleprevious2={handleprevious2}
        handleCancel2={handleCancel2}
        visible2={visible2}
      />

      <PopUp3
        visible3={visible3}
        handleNext3={handleNext3}
        handleprevious3={handleprevious3}
        handleCancel3={handleCancel3}
        onFinish={handleFormFinish3}
      />

      <PopUp4
        visible4={visible4}
        handleNext4={handleNext4}
        handleprevious4={handleprevious4}
        onFinish={handleFormFinish4}
        handleCancel4={handleCancel4}
      />

      <PopUp5
        visible5={visible5}
        handleNext5={handleNext5}
        handleprevious5={handleprevious5}
        onFinish={handleFormFinish5}
        handleCancel5={handleCancel5}
      />

      <PopUp6
        visible6={visible6}
        handleNext6={handleNext6}
        handleprevious6={handleprevious6}
        onFinish={handleFormFinish6}
        handleCancel6={handleCancel6}
      />

      <PopUp7
        visible7={visible7}
        handleNext7={handleNext7}
        handleprevious7={handleprevious7}
        handleCancel7={handleCancel7}
        onFinish={handleFormFinish7}
      />

      <PopUp8
        visible8={visible8}
        handleFinish={handleFinish}
        handleprevious8={handleprevious8}
        onFinish={handleFormFinish8}
        handleCancel8={handleCancel8}
      />
    </div>
  );
};

export default HeadCoachSignUp;
