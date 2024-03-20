import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { ResendActivateEmailLink } from "@/app/helpers/resendActivationLink";
import { constants } from "buffer";
import { Result } from "postcss";
import Link from "next/link";
import {Router} from "next/router";
import {useRouter} from "next/navigation";

type AccountStatus =
  | "ACTIVATION_FAILED"
  | "PASSWORD_RESET_LINK_SUCCESS"
  | "PASSWORD_RESET_LINK_FAILED"
  | "PASSWORD_RESET_FAILED"
  | "PASSWORD_RESET_SUCCESS"
  | "RE_ACTIVATION_FAILED"
  | "EMAIL_RESEND_ACTIVATION_LINK_SUCCESS"
  | "EMAIL_RESEND_ACTIVATION_LINK_FAILED"
  | "CREATED_SUCCESS"
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "ACTIVATION_FAILED"
  | "ACTIVATION_SUCCESS";

interface StatusModalProps {
  email?: string;
  status: AccountStatus;
  booleanCallback?:any
  onSendActivationLink: any; // Function to send activation link
}

const StatusModal: React.FC<StatusModalProps> = ({
  status,
  onSendActivationLink,
  booleanCallback,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [_status, setStatus] = useState<string>(status);
  const [email, setEmail] = useState<string>(status);
  const router = useRouter()

  React.useEffect(() => {
    onOpen();
    console.log(email);
  }, [email]);

  // Infer title based on status
  const getTitle = (): string => {
    switch (_status) {
      case "CREATED_SUCCESS":
        return "Account Created Successfully";
      case "LOGIN_SUCCESS":
        return "Login Successful";
      case "LOGIN_FAILED":
        return "Login Failed";
      case "ACTIVATION_SUCCESS":
        return "Email Confirmatin Successful";
      case "ACTIVATION_FAILED":
        return "Activation Failed";
      case "EMAIL_RESEND_ACTIVATION_LINK_SUCCESS":
        return "Email Verification Resend Successfully";
      case "EMAIL_RESEND_ACTIVATION_LINK_FAILED":
        return "Email Verification Links Failed On Resend";
      case "PASSWORD_RESET_LINK_SUCCESS":
        return "Password Reset Link Sent Successfully";
      case "PASSWORD_RESET_LINK_FAILED":
        return "Password Reset Link Sent Failed";
      case "PASSWORD_RESET_SUCCESS":
        return "Password Reset  Successfully";
      case "PASSWORD_RESET_FAILED":
        return "Password Reset Failed";

      default:
        return "Status";
    }
  };

  // Infer content and action based on status
  const getContentAndActions = () => {
    switch (_status) {
      case "CREATED_SUCCESS":
        return {
          content:
            "Your account has been successfully created! A confirmation email has been sent. Please check your email to activate your account.",
          actions: (
            <Button
              color="primary"
              onPress={() => {
                if(booleanCallback)booleanCallback(false)
                onSendActivationLink();
                onClose();
              }}
            >
              OK
            </Button>
          ),
        };
      case "LOGIN_SUCCESS":
        return {
          content: "You have successfully logged in.",
          actions: (
            <Button
              color="primary"
              onPress={() => {
                if(booleanCallback)booleanCallback(false)
                onClose();
                onSendActivationLink();
              }}
            >
              Proceed to Dashboard
            </Button>
          ),
        };
      case "LOGIN_FAILED":
        return {
          content:
            "Failed to login. Please check your credentials and try again.",
          actions: (
            <>
              <Button
                color="danger"
                onClick={() => {
                  onSendActivationLink();
                  onClose();
                  if(booleanCallback)booleanCallback(false)
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onSendActivationLink();
                  onClose();
                  if(booleanCallback)booleanCallback(false)
                }}
              >
                {" "}
                {/* Presuming a retry would just reopen the modal for another action */}
                Retry
              </Button>
            </>
          ),
        };
      case "RE_ACTIVATION_FAILED":
        return {
          content:
            "Failed to activate your account. Would you like to resend the activation link?",
          actions: (
            <>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                className="border-blue-500 text-slate-900"
              />
              <Button
                color="primary"
                onClick={() => {
                  onClose();
                  if(booleanCallback)booleanCallback(false)
                  ResendActivateEmailLink(
                    email ?? "",
                    "ACTIVATION_FAILED"
                  ).then((result) => {
                    setStatus(result);
                    console.log("log in", result);
                  });
                  onSendActivationLink();
                  
                }}
              >
                Resend Link
              </Button>
            </>
          ),
        };
      case "ACTIVATION_FAILED":
        return {
          content:
            "Failed to activate your account. Would you like to resend the activation  Again?",
          actions: (
            <>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                className="border-blue-500 text-slate-900"
              />
              <Button
                color="primary"
                onClick={() => {
                  if(booleanCallback)booleanCallback(false)
                  onClose();
                  ResendActivateEmailLink(
                    email ?? "",
                    "RE_ACTIVATION_FAILED"
                  ).then((result: any) => {
                    setStatus(result);
                    console.log("log in", result, email);
                  });
                  onSendActivationLink();
                }}
              >
                Resend Link
              </Button>
            </>
          ),
        };
      case "ACTIVATION_SUCCESS":
        return {
          content: "Account activated Succesfully",
          actions: (
            <>
              <Button
                color="success"
                onClick={() => {
                  if(booleanCallback)booleanCallback(false)
                  onClose();
                  onSendActivationLink();
                  if(booleanCallback)booleanCallback(false)
                }}
              >
                Close
              </Button>
              <Button color="primary" onPress={()=>{onSendActivationLink();router.push('/auth/login')}} >
                Login
              </Button>
            </>
          ),
        };
      case "EMAIL_RESEND_ACTIVATION_LINK_SUCCESS":
        return {
          content:
            "Email confirmation link sent t Successfully, if you have an email associated with our database you will recive a notification on your email, Check your spam is not seen . Thanks!",
          actions: (
            <Button
              color="success"
              onClick={() => {
                onClose();
                if(booleanCallback)booleanCallback(false)
              }}
            >
              Close
            </Button>
          ),
        };
      case "PASSWORD_RESET_LINK_SUCCESS":
        return {
          content:
            "Password reset link sent is sent successfully, if you have an email associated with our database you will recive a notification on your email, on how to rest your password. Check your spam is not seen . Thanks!",
          actions: (
            <Button
              color="success"
              onClick={() => {
                onClose();
                if(booleanCallback)booleanCallback(false)
              }}
            >
              Close
            </Button>
          ),
        };
      case "PASSWORD_RESET_SUCCESS":
        return {
          content: "You Have Successfully Change Your Password",
          actions: (
            <Button
            className="text-white"
              color="success"
              onClick={() => {
                onClose();
                router.push('/auth/login')
              }}
            >
            Login
            </Button>
          ),
        };
      case "PASSWORD_RESET_SUCESS":
        return {
          content: "You Have Successfully Change Your Password",
          actions: (
            <Button
              color="success"
              onClick={() => {
                if(booleanCallback)booleanCallback(false)
                onClose();
              }}
            >
              Close
            </Button>
          ),
        };
      case "PASSWORD_RESET_FAILED":
        return {
          content:
            "Your attempt to changed your password was unable to be processed, please check your credentials and verify you tokens or contact KICData Privacy teams. Thanks",
          actions: (
            <Button
              color="warning"

              onClick={() => {
                onClose();
                if(booleanCallback)booleanCallback(false)
              }}
            >
              Close
            </Button>
          ),
        };
      case "EMAIL_RESEND_ACTIVATION_LINK_FAILED":
        return {
          content:
            "Email confirmation link sent  Successfully, if you have an email associated with our database you will recive a notification on your email, Check your spam is not seen . Thanks!",
          actions: (
            <>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                className="border-blue-500 text-slate-900"
              />

              <Button
                color="primary"
                onClick={() => {
                  if(booleanCallback)booleanCallback(false)
                  onClose();
                  ResendActivateEmailLink(email ?? "").then((result) =>
                    setStatus(result)
                  );
                  onSendActivationLink();
                }}
              >
                Resend Activation Link
              </Button>
            </>
          ),
        };
      default:
        return { content: "", actions: null };
    }
  };

  const { content, actions } = getContentAndActions();

  return (
    <div>
      <Modal isOpen={isOpen} onClose={
        ()=>{
        if(booleanCallback){
          booleanCallback(false)
        }
        if(status ==='PASSWORD_RESET_SUCCESS'){
          router.push('/auth/login')
        }
        onClose()
      }
        }>
        <ModalContent>
          <ModalHeader>{getTitle()}</ModalHeader>
          <ModalBody>{content}</ModalBody>
          <ModalFooter>{actions}</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StatusModal;
