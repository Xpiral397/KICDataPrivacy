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

type AccountStatus =
  | "ACTIVATION_FAILED"
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
  onSendActivationLink: any; // Function to send activation link
}

const StatusModal: React.FC<StatusModalProps> = ({
  status,
  onSendActivationLink,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [_status, setStatus] = useState<string>(status);
  const [email, setEmail] = useState<string>(status);

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
        return "Email Confirm Successful";
      case "ACTIVATION_FAILED":
        return "Activation Failed";
      case "EMAIL_RESEND_ACTIVATION_LINK_SUCCESS":
        return "Email Verification Resend Successfully";
      case "EMAIL_RESEND_ACTIVATION_LINK_FAILED":
        return "Email Verification Links Failed On Resend";
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
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onSendActivationLink();
                  onOpen();
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
                className="text-slate-900 border-blue-500"
              />
              <Button
                color="primary"
                onClick={() => {
                  onClose();
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
                className="text-slate-900 border-blue-500"
              />
              <Button
                color="primary"
                onClick={() => {
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
                  onClose();
                  onSendActivationLink();
                }}
              >
                Close
              </Button>
              <Button color="primary" onPress={onSendActivationLink}>
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
                className="text-slate-900 border-blue-500"
              />

              <Button
                color="primary"
                onClick={() => {
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
